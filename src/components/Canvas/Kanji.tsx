import {FC, useRef, useState} from "react";
import {MathUtils, Mesh} from "three";
import {useGLTF} from "@react-three/drei";
import {useFrame, useThree} from "@react-three/fiber";

const Kanji: FC<{ z: number }> = ({z}) => {
    const ref = useRef<Mesh>(null!);
    const {nodes, materials}: any = useGLTF('/kanji-v1-transformed.glb')

    const {viewport, camera} = useThree();
    const {width, height} = viewport.getCurrentViewport(camera, [0, 0, z]);

    const [data] = useState({
        x: MathUtils.randFloatSpread(2),
        y: MathUtils.randFloatSpread(height),
        rX: Math.random() * Math.PI,
        rZ: Math.random() * Math.PI,
        rY: Math.random() * Math.PI,
    });

    useFrame(() => {
        ref.current.rotation.set((data.rX += 0.001), (data.rY += 0.001), (data.rZ += 0.001));
        ref.current.position.set(data.x * width, (data.y += 0.25), z);

        if (data.y > height) data.y = -height;
    });

    return (
        <mesh ref={ref}
              geometry={nodes.kanji.geometry}
              material={materials['skin.001']}
              scale={[0.3, 0.3, 0.3]}
        />
    )
}

export default Kanji;
