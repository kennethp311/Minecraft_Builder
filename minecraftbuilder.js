import {defs, tiny} from './examples/common.js';

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Matrix, Mat4, Light, Shape, Material, Scene, Texture,
} = tiny;

const {Textured_Phong, Cube, Square} = defs

// const Square =
//     class Square extends tiny.Vertex_Buffer {
//         constructor() {
//             super("position", "normal", "texture_coord");
//             this.arrays.position = [
//                 vec3(0, 0, 0), vec3(1, 0, 0), vec3(0, 1, 0),
//                 vec3(1, 1, 0), vec3(1, 0, 0), vec3(0, 1, 0)
//             ];
//             this.arrays.normal = [
//                 vec3(0, 0, 1), vec3(0, 0, 1), vec3(0, 0, 1),
//                 vec3(0, 0, 1), vec3(0, 0, 1), vec3(0, 0, 1),
//             ];
//             this.arrays.texture_coord = [
//                 vec(0, 0), vec(1, 0), vec(0, 1),
//                 vec(1, 1), vec(1, 0), vec(0, 1)
//             ]
//         }
//     }

export class MinecraftBuilder extends Scene {
    constructor() {
        super();
        this.hover = this.swarm = false;
        this.shapes = {
            'cube': new Cube(),
            'floor': new Square(),
        };

        // *** Materials
        this.materials = {
            plastic: new Material(new defs.Phong_Shader(),
                {ambient: .4, diffusivity: .6, color: hex_color("#ffffff")}),
            grass_jpg: new Material(new Textured_Phong(),{
                color: hex_color("#000000"),
                ambient: 1,
                texture: new Texture("assets/grass.jpg", "LINEAR_MIPMAP_LINEAR")
            }),
        };
        // The white material and basic shader are used for drawing the outline.
        this.white = new Material(new defs.Basic_Shader());
    }

    make_control_panel() {
        // Draw the scene's buttons, setup their actions and keyboard shortcuts, and monitor live measurements.
       // this.key_triggered_button("Delete Base", ["c"], this.set_colors);
       // this.key_triggered_button("Turn House in to Sand", ["s"], this.set_colors);
    }


    display(context, program_state) {
        if (!context.scratchpad.controls) {
            this.children.push(context.scratchpad.controls = new defs.Movement_Controls());
            // Define the global camera and projection matrices, which are stored in program_state.
            program_state.set_camera(Mat4.translation(0, -10, -50));
        }
        program_state.projection_transform = Mat4.perspective(
            Math.PI / 4, context.width / context.height, 1, 100);

        // *** Lights: *** Values of vector or point lights.
        const light_position = vec4(0, 5, 5, 1);
        program_state.lights = [new Light(light_position, color(1, 1, 1, 1), 1000)];

        let model_transform = Mat4.identity();


        let floor_transformation = Mat4.identity();
        floor_transformation = floor_transformation.times(Mat4.rotation(Math.PI/2,1,0,0)).times(Mat4.scale(100,100,1));
        this.shapes.floor.arrays.texture_coord.forEach(
            (v,i,l) => l[i] = vec(v[0],v[1]).times(100)
        )

        this.shapes.floor.draw(context, program_state, floor_transformation, this.materials.grass_jpg);
    }
}