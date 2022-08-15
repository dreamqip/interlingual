import {FC, Suspense} from 'react';
import {Canvas} from "@react-three/fiber";
import {Environment} from "@react-three/drei";
import {DepthOfField, EffectComposer} from "@react-three/postprocessing";
import Kanji from "@components/Canvas/Kanji";

interface CanvasProps {
    count?: number;
    depth?: number;
}

const MyCanvas: FC<CanvasProps> = ({count = 100, depth = 80}) => {
    return (
        <div className="fixed inset-0 z-0">
            <Canvas gl={{alpha: false, antialias: true}} camera={{near: 0.01, far: 110, fov: 30}}>
                <color attach="background" args={["#ffffff"]}/>
                <ambientLight intensity={0.3}/>
                {/*<spotLight position={[10, 10, 10]} intensity={1.5}/>*/}
                <Suspense fallback={null}>
                    {Array.from({length: count}, (_, i) =>
                        <Kanji key={i} z={-(i / count) * depth - 20}/>
                    )}
                    <Environment preset="forest"/>
                    <EffectComposer>
                        <DepthOfField target={[0, 0, depth / 2]} focalLength={0.5} bokehScale={11} height={700}/>
                    </EffectComposer>
                </Suspense>
            </Canvas>
        </div>
    );
};

export default MyCanvas;
