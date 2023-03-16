import {defs, tiny} from './examples/common.js';

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Matrix, Mat4, Light, Shape, Material, Scene, Texture,
} = tiny;

const {Textured_Phong, Cube, Square} = defs


export class MinecraftBuilder extends Scene {
    constructor() {
        super();
        this.hover = this.swarm = false;
        this.shapes = {
            'cube': new Cube(),
            'floor': new Square(),
            'sky_sphere': new defs.Subdivision_Sphere(4),
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
            sky_png: new Material(new Textured_Phong(),{
                color: hex_color("#000000"),
                ambient: 1,
                texture: new Texture("assets/sky.png", "LINEAR_MIPMAP_LINEAR")
            }),
            wood: new Material(new Textured_Phong(),{
                color: hex_color("#000000"),
                ambient: 1,
                texture: new Texture("assets/minecraft_woodplank.png", "LINEAR_MIPMAP_LINEAR")
            }),
            stone: new Material(new Textured_Phong(),{
                color: hex_color("#000000"),
                ambient: 1,
                texture: new Texture("assets/minecraft_stone.png", "LINEAR_MIPMAP_LINEAR")
            }),
            stonebrick: new Material(new Textured_Phong(),{
                color: hex_color("#000000"),
                ambient: 1,
                texture: new Texture("assets/minecraft_stonebrick.png", "LINEAR_MIPMAP_LINEAR")
            }),
            redbrick: new Material(new Textured_Phong(),{
                color: hex_color("#000000"),
                ambient: 1,
                texture: new Texture("assets/minecraft_redbrick.png", "LINEAR_MIPMAP_LINEAR")
            }),
            sand: new Material(new Textured_Phong(),{
                color: hex_color("#000000"),
                ambient: 1,
                texture: new Texture("assets/minecraft_sand.png", "LINEAR_MIPMAP_LINEAR")
            }),
        };
        // The white material and basic shader are used for drawing the outline.
        this.white = new Material(new defs.Basic_Shader());
        this.mytime = 0.5;


        this.pillar_exist = true;
        this.sand_house = false;
        this.fall = false;
        this.currtime = 29.36742345;
        this.house_floor_transform = [];
        this.old_floor_x = [];
        this.old_floor_z = [];
        this.house_wall_transform = [];
        this.old_wall_x = [];
        this.old_wall_z = [];
        this.house_roof_transform = [];
        this.old_roof_x = [];
        this.old_roof_z = [];
    }

    make_control_panel() {
        this.key_triggered_button("Delete Pillars", ["c"], () => this.pillar_exist = !this.pillar_exist);

        this.key_triggered_button("Turn House into sand", ["k"], () => this.sand_house = !this.sand_house);

       //this.key_triggered_button("Delete Base", ["c"], this.set_colors);
       // this.key_triggered_button("Turn House in to Sand", ["s"], this.set_colors);
    }


    display(context, program_state) {
        if (!context.scratchpad.controls) {
            this.children.push(context.scratchpad.controls = new defs.Movement_Controls());
            // Define the global camera and projection matrices, which are stored in program_state.
            program_state.set_camera(Mat4.translation(0, -15, -40));
        }
        program_state.projection_transform = Mat4.perspective(
            Math.PI / 4, context.width / context.height, 1, 100);

        // *** Lights: *** Values of vector or point lights.
        const light_position = vec4(0, 50, 0, 1);
        program_state.lights = [new Light(light_position, color(1, 1, 1, 1), 1000)];

        const t = program_state.animation_time / 1000, dt = program_state.animation_delta_time / 1000;



        let pillar_transform = [Mat4.identity().times(Mat4.translation(-6, 0, 0, 0)),
                                Mat4.identity().times(Mat4.translation(6, 0, 0, 0)),
                                Mat4.identity().times(Mat4.translation(-6, 0, -12, 0)),
                                Mat4.identity().times(Mat4.translation(6, 0, -12, 0))]


        if (this.pillar_exist)
        {
            if (Math.floor(t) > 1.0)
            {
                for (let i = 0; i < 4; i++)
                {
                    pillar_transform[i] = pillar_transform[i].times(Mat4.translation(0,1,0));
                    this.shapes.cube.draw(context, program_state, pillar_transform[i], this.materials.wood);
                }
            }
            if (Math.floor(t) > 2.0)
            {
                for (let i = 0; i < 4; i++)
                {
                    pillar_transform[i] = pillar_transform[i].times(Mat4.translation(0,2,0));
                    this.shapes.cube.draw(context, program_state, pillar_transform[i], this.materials.wood);
                }
            }
            if (Math.floor(t) > 3.0)
            {
                for (let i = 0; i < 4; i++)
                {
                    pillar_transform[i] = pillar_transform[i].times(Mat4.translation(0,2,0));
                    this.shapes.cube.draw(context, program_state, pillar_transform[i], this.materials.wood);
                }
            }
            if (Math.floor(t) > 4.0)
            {
                for (let i = 0; i < 4; i++)
                {
                    pillar_transform[i] = pillar_transform[i].times(Mat4.translation(0,2,0));
                    this.shapes.cube.draw(context, program_state, pillar_transform[i], this.materials.wood);
                }
            }
        }


        if (!this.sand_house && !this.fall)
        {
            if (Math.floor(t) > 5.0)
            {
                let house_floor_transform = [Mat4.identity().times(Mat4.translation(-6, 9, 0, 0)),
                                             Mat4.identity().times(Mat4.translation(6, 9, 0, 0)),
                                             Mat4.identity().times(Mat4.translation(-6, 9, -12, 0)),
                                             Mat4.identity().times(Mat4.translation(6, 9, -12, 0)),
                                             ]

                for (let i = 0; i < 4; i++)
                    this.shapes.cube.draw(context, program_state, house_floor_transform[i], this.materials.stone);

                if (Math.floor(t) > 6.0)
                {
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, 9, 0, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, 9, 0, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, 9, -12, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, 9, -12, 0)));


                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(6, 9, -10, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(-6, 9, -10, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(6, 9, -2, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(-6, 9, -2, 0)));

                    for (let i = 4; i < 12; i++)
                        this.shapes.cube.draw(context, program_state, house_floor_transform[i], this.materials.stone);

                }

                if (Math.floor(t) > 7.0)
                {
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, 9, 0, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, 9, 0, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, 9, -12, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, 9, -12, 0)));

                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(6, 9, -8, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(-6, 9, -8, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(6, 9, -4, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(-6, 9, -4, 0)));

                    for (let i = 12; i < 20; i++)
                        this.shapes.cube.draw(context, program_state, house_floor_transform[i], this.materials.stone);

                }

                if (Math.floor(t) > 8.0)
                {
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, 9, 0, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, 9, -12, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(6, 9, -6, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(-6, 9, -6, 0)));
                    for (let i = 20; i < 24; i++)
                        this.shapes.cube.draw(context, program_state, house_floor_transform[i], this.materials.stone);
                }

                if (Math.floor(t) > 8.0)
                {
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, 9, -10, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, 9, -10, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, 9, -10, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, 9, -10, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, 9, -10, 0)));
                    for (let i = 24; i < 29; i++)
                        this.shapes.cube.draw(context, program_state, house_floor_transform[i], this.materials.stone);
                }
                if (Math.floor(t) > 8.0)
                {
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, 9, -8, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, 9, -8, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, 9, -8, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, 9, -8, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, 9, -8, 0)));
                    for (let i = 29; i < 34; i++)
                        this.shapes.cube.draw(context, program_state, house_floor_transform[i], this.materials.stone);
                }

                if (Math.floor(t) > 8.0)
                {
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, 9, -6, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, 9, -6, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, 9, -6, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, 9, -6, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, 9, -6, 0)));
                    for (let i = 34; i < 39; i++)
                        this.shapes.cube.draw(context, program_state, house_floor_transform[i], this.materials.stone);
                }

                if (Math.floor(t) > 8.0)
                {
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, 9, -4, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, 9, -4, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, 9, -4, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, 9, -4, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, 9, -4, 0)));
                    for (let i = 39; i < 44; i++)
                        this.shapes.cube.draw(context, program_state, house_floor_transform[i], this.materials.stone);
                }

                if (Math.floor(t) > 8.0)
                {
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, 9, -2, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, 9, -2, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, 9, -2, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, 9, -2, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, 9, -2, 0)));
                    for (let i = 44; i < 49; i++)
                        this.shapes.cube.draw(context, program_state, house_floor_transform[i], this.materials.stone);
                }
            }

            if (Math.floor(t) > 8.0)
            {
                let house_wall_transform = [Mat4.identity().times(Mat4.translation(-6, 11, 0, 0)),
                                            Mat4.identity().times(Mat4.translation(6, 11, 0, 0)),
                                            Mat4.identity().times(Mat4.translation(-6, 11, -12, 0)),
                                            Mat4.identity().times(Mat4.translation(6, 11, -12, 0)),]

                for (let i = 0; i < 4; i++)
                    this.shapes.cube.draw(context, program_state, house_wall_transform[i], this.materials.stonebrick);

                if (Math.floor(t) > 8.0)
                {
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, 11, 0, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, 11, 0, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, 11, -12, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, 11, -12, 0)));

                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, 11, -10, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, 11, -10, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, 11, -2, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, 11, -2, 0)));
                    for (let i = 4; i < 12; i++)
                        this.shapes.cube.draw(context, program_state, house_wall_transform[i], this.materials.stonebrick);
                }

                if (Math.floor(t) > 8.0)
                {
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(-2, 11, 0, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(2, 11, 0, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(-2, 11, -12, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(2, 11, -12, 0)));

                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, 11, -8, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, 11, -8, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, 11, -4, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, 11, -4, 0)));

                    for (let i = 12; i < 20; i++)
                        this.shapes.cube.draw(context, program_state, house_wall_transform[i], this.materials.stonebrick);
                }
                if (Math.floor(t) > 8.0)
                {
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(0, 11, -12, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, 11, -6, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, 11, -6, 0)));
                    for (let i = 20; i < 23; i++)
                        this.shapes.cube.draw(context, program_state, house_wall_transform[i], this.materials.stonebrick);
                }

                let y_wall = 13;
                if (Math.floor(t) > 8.0)
                {
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, 0, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, 0, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -12, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -12, 0)));
                    for (let i = 23; i < 27; i++)
                        this.shapes.cube.draw(context, program_state, house_wall_transform[i], this.materials.stonebrick);
                }
                if (Math.floor(t) > 8.0)
                {
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, y_wall, 0, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, y_wall, 0, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, y_wall, -12, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, y_wall, -12, 0)));

                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -10, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -10, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -2, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -2, 0)));
                    for (let i = 27; i < 35; i++)
                        this.shapes.cube.draw(context, program_state, house_wall_transform[i], this.materials.stonebrick);
                }
                if (Math.floor(t) > 8.0)
                {
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(-2, y_wall, 0, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(2, y_wall, 0, 0)));

                    for (let i = 35; i < 37; i++)
                        this.shapes.cube.draw(context, program_state, house_wall_transform[i], this.materials.stonebrick);
                }
                if (Math.floor(t) > 8.0)
                {
                    y_wall = y_wall + 2;

                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, 0, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, 0, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -12, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -12, 0)));
                    for (let i = 37; i < 41; i++)
                        this.shapes.cube.draw(context, program_state, house_wall_transform[i], this.materials.stonebrick);
                }
                if (Math.floor(t) > 8.0)
                {
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, y_wall, 0, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, y_wall, 0, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, y_wall, -12, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, y_wall, -12, 0)));

                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -10, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -10, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -2, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -2, 0)));
                    for (let i = 41; i < 49; i++)
                        this.shapes.cube.draw(context, program_state, house_wall_transform[i], this.materials.stonebrick);
                }
                if (Math.floor(t) > 8.0)
                {
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(-2, y_wall, 0, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(2, y_wall, 0, 0)));

                    for (let i = 49; i < 51; i++)
                        this.shapes.cube.draw(context, program_state, house_wall_transform[i], this.materials.stonebrick);
                }
                if (Math.floor(t) > 8.0)
                {
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(0, y_wall, 0, 0)));
                    this.shapes.cube.draw(context, program_state, house_wall_transform[51], this.materials.stonebrick);
                }
                if (Math.floor(t) > 8.0)
                {
                    y_wall = y_wall + 2;

                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, 0, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, 0, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -12, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -12, 0)));
                    for (let i = 52; i < 56; i++)
                        this.shapes.cube.draw(context, program_state, house_wall_transform[i], this.materials.stonebrick);
                }
                if (Math.floor(t) > 8.0)
                {
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, y_wall, 0, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, y_wall, 0, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, y_wall, -12, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, y_wall, -12, 0)));

                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -10, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -10, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -2, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -2, 0)));
                    for (let i = 56; i < 64; i++)
                        this.shapes.cube.draw(context, program_state, house_wall_transform[i], this.materials.stonebrick);
                }
                if (Math.floor(t) > 8.0)
                {
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(-2, y_wall, 0, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(2, y_wall, 0, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(-2, y_wall, -12, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(2, y_wall, -12, 0)));

                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -8, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -8, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -4, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -4, 0)));
                    for (let i = 64; i < 72; i++)
                        this.shapes.cube.draw(context, program_state, house_wall_transform[i], this.materials.stonebrick);
                }
                if (Math.floor(t) > 8.0)
                {

                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(0, y_wall, 0, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(0, y_wall, -12, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -6, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -6, 0)));
                    for (let i = 72; i < 76; i++)
                        this.shapes.cube.draw(context, program_state, house_wall_transform[i], this.materials.stonebrick);
                }

            }
            if (Math.floor(t) > 8.0)
            {
                let y_roof = 19;
                let house_roof_transform = [Mat4.identity().times(Mat4.translation(-4, y_roof, -2, 0)),
                                            Mat4.identity().times(Mat4.translation(4, y_roof, -2, 0)),
                                            Mat4.identity().times(Mat4.translation(-4, y_roof, -10, 0)),
                                            Mat4.identity().times(Mat4.translation(4, y_roof, -10, 0)),]

                for (let i = 0; i < 4; i++)
                    this.shapes.cube.draw(context, program_state, house_roof_transform[i], this.materials.redbrick);


                if (Math.floor(t) > 8.0)
                {
                    house_roof_transform.push(Mat4.identity().times(Mat4.translation(-2, y_roof, -2, 0)));
                    house_roof_transform.push(Mat4.identity().times(Mat4.translation(2, y_roof, -2, 0)));
                    house_roof_transform.push(Mat4.identity().times(Mat4.translation(-2, y_roof, -10, 0)));
                    house_roof_transform.push(Mat4.identity().times(Mat4.translation(2, y_roof, -10, 0)));

                    house_roof_transform.push(Mat4.identity().times(Mat4.translation(-4, y_roof, -4, 0)));
                    house_roof_transform.push(Mat4.identity().times(Mat4.translation(4, y_roof, -4, 0)));
                    house_roof_transform.push(Mat4.identity().times(Mat4.translation(-4, y_roof, -8, 0)));
                    house_roof_transform.push(Mat4.identity().times(Mat4.translation(4, y_roof, -8, 0)));

                    for (let i = 4; i < 12; i++)
                        this.shapes.cube.draw(context, program_state, house_roof_transform[i], this.materials.redbrick);

                }
                if (Math.floor(t) > 8.0)
                {
                    house_roof_transform.push(Mat4.identity().times(Mat4.translation(0, y_roof, -2, 0)));
                    house_roof_transform.push(Mat4.identity().times(Mat4.translation(0, y_roof, -10, 0)));
                    house_roof_transform.push(Mat4.identity().times(Mat4.translation(-4, y_roof, -6, 0)));
                    house_roof_transform.push(Mat4.identity().times(Mat4.translation(4, y_roof, -6, 0)));

                    for (let i = 12; i < 16; i++)
                        this.shapes.cube.draw(context, program_state, house_roof_transform[i], this.materials.redbrick);
                }
                if (Math.floor(t) > 8.0)
                {
                    y_roof = y_roof + 2;
                    house_roof_transform.push(Mat4.identity().times(Mat4.translation(-2, y_roof, -4, 0)));
                    house_roof_transform.push(Mat4.identity().times(Mat4.translation(2, y_roof, -4, 0)));
                    house_roof_transform.push(Mat4.identity().times(Mat4.translation(-2, y_roof, -8, 0)));
                    house_roof_transform.push(Mat4.identity().times(Mat4.translation(2, y_roof, -8, 0)));

                    for (let i = 16; i < 20; i++)
                        this.shapes.cube.draw(context, program_state, house_roof_transform[i], this.materials.redbrick);
                }

                if (Math.floor(t) > 8.0)
                {
                    house_roof_transform.push(Mat4.identity().times(Mat4.translation(0, y_roof, -4, 0)));
                    house_roof_transform.push(Mat4.identity().times(Mat4.translation(0, y_roof, -8, 0)));
                    house_roof_transform.push(Mat4.identity().times(Mat4.translation(2, y_roof, -6, 0)));
                    house_roof_transform.push(Mat4.identity().times(Mat4.translation(-2, y_roof, -6, 0)));

                    for (let i = 20; i < 24; i++)
                        this.shapes.cube.draw(context, program_state, house_roof_transform[i], this.materials.redbrick);
                }
                if (Math.floor(t) > 8.0)
                {
                    y_roof = y_roof + 2;
                    house_roof_transform.push(Mat4.identity().times(Mat4.translation(0, y_roof, -6, 0)));
                    this.shapes.cube.draw(context, program_state, house_roof_transform[24], this.materials.redbrick);
                }
            }

        }

        if (this.sand_house && !this.fall)
        {
            let house_floor_transform = [Mat4.identity().times(Mat4.translation(-6, 9, 0, 0)),
                                         Mat4.identity().times(Mat4.translation(6, 9, 0, 0)),
                                         Mat4.identity().times(Mat4.translation(-6, 9, -12, 0)),
                                         Mat4.identity().times(Mat4.translation(6, 9, -12, 0)),]

            this.old_floor_x.push(-6);
            this.old_floor_x.push(6);
            this.old_floor_x.push(-6);
            this.old_floor_x.push(6);

            this.old_floor_z.push(0);
            this.old_floor_z.push(0);
            this.old_floor_z.push(-12);
            this.old_floor_z.push(-12);
            house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, 9, 0, 0)));
            house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, 9, 0, 0)));
            house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, 9, -12, 0)));
            house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, 9, -12, 0)));

            this.old_floor_x.push(-4);
            this.old_floor_x.push(4);
            this.old_floor_x.push(4);
            this.old_floor_x.push(-4);

            this.old_floor_z.push(0);
            this.old_floor_z.push(0);
            this.old_floor_z.push(-12);
            this.old_floor_z.push(-12);


            house_floor_transform.push(Mat4.identity().times(Mat4.translation(6, 9, -10, 0)));
            house_floor_transform.push(Mat4.identity().times(Mat4.translation(-6, 9, -10, 0)));
            house_floor_transform.push(Mat4.identity().times(Mat4.translation(6, 9, -2, 0)));
            house_floor_transform.push(Mat4.identity().times(Mat4.translation(-6, 9, -2, 0)));
            this.old_floor_x.push(6);
            this.old_floor_x.push(-6);
            this.old_floor_x.push(6);
            this.old_floor_x.push(-6);

            this.old_floor_z.push(-10);
            this.old_floor_z.push(-10);
            this.old_floor_z.push(-2);
            this.old_floor_z.push(-2);

            house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, 9, 0, 0)));
            house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, 9, 0, 0)));
            house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, 9, -12, 0)));
            house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, 9, -12, 0)));
            this.old_floor_x.push(-2);
            this.old_floor_x.push(2);
            this.old_floor_x.push(2);
            this.old_floor_x.push(-2);

            this.old_floor_z.push(0);
            this.old_floor_z.push(0);
            this.old_floor_z.push(-12);
            this.old_floor_z.push(-12);

            house_floor_transform.push(Mat4.identity().times(Mat4.translation(6, 9, -8, 0)));
            house_floor_transform.push(Mat4.identity().times(Mat4.translation(-6, 9, -8, 0)));
            house_floor_transform.push(Mat4.identity().times(Mat4.translation(6, 9, -4, 0)));
            house_floor_transform.push(Mat4.identity().times(Mat4.translation(-6, 9, -4, 0)));
            this.old_floor_x.push(6);
            this.old_floor_x.push(-6);
            this.old_floor_x.push(6);
            this.old_floor_x.push(-6);

            this.old_floor_z.push(-8);
            this.old_floor_z.push(-8);
            this.old_floor_z.push(-4);
            this.old_floor_z.push(-4);
            house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, 9, 0, 0)));
            house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, 9, -12, 0)));
            house_floor_transform.push(Mat4.identity().times(Mat4.translation(6, 9, -6, 0)));
            house_floor_transform.push(Mat4.identity().times(Mat4.translation(-6, 9, -6, 0)));
            this.old_floor_x.push(0);
            this.old_floor_x.push(0);
            this.old_floor_x.push(6);
            this.old_floor_x.push(-6);

            this.old_floor_z.push(0);
            this.old_floor_z.push(-12);
            this.old_floor_z.push(-6);
            this.old_floor_z.push(-6);

            house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, 9, -10, 0)));
            house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, 9, -10, 0)));
            house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, 9, -10, 0)));
            house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, 9, -10, 0)));
            house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, 9, -10, 0)));
            this.old_floor_x.push(-4);
            this.old_floor_x.push(4);
            this.old_floor_x.push(-2);
            this.old_floor_x.push(2);
            this.old_floor_x.push(0);

            this.old_floor_z.push(-10);
            this.old_floor_z.push(-10);
            this.old_floor_z.push(-10);
            this.old_floor_z.push(-10);
            this.old_floor_z.push(-10);

            house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, 9, -8, 0)));
            house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, 9, -8, 0)));
            house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, 9, -8, 0)));
            house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, 9, -8, 0)));
            house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, 9, -8, 0)));
            this.old_floor_x.push(-4);
            this.old_floor_x.push(4);
            this.old_floor_x.push(-2);
            this.old_floor_x.push(2);
            this.old_floor_x.push(0);

            this.old_floor_z.push(-8);
            this.old_floor_z.push(-8);
            this.old_floor_z.push(-8);
            this.old_floor_z.push(-8);
            this.old_floor_z.push(-8);

            house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, 9, -6, 0)));
            house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, 9, -6, 0)));
            house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, 9, -6, 0)));
            house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, 9, -6, 0)));
            house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, 9, -6, 0)));
            this.old_floor_x.push(-4);
            this.old_floor_x.push(4);
            this.old_floor_x.push(-2);
            this.old_floor_x.push(2);
            this.old_floor_x.push(0);

            this.old_floor_z.push(-6);
            this.old_floor_z.push(-6);
            this.old_floor_z.push(-6);
            this.old_floor_z.push(-6);
            this.old_floor_z.push(-6);

            house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, 9, -4, 0)));
            house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, 9, -4, 0)));
            house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, 9, -4, 0)));
            house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, 9, -4, 0)));
            house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, 9, -4, 0)));
            this.old_floor_x.push(-4);
            this.old_floor_x.push(4);
            this.old_floor_x.push(-2);
            this.old_floor_x.push(2);
            this.old_floor_x.push(0);

            this.old_floor_z.push(-4);
            this.old_floor_z.push(-4);
            this.old_floor_z.push(-4);
            this.old_floor_z.push(-4);
            this.old_floor_z.push(-4);

            house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, 9, -2, 0)));
            house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, 9, -2, 0)));
            house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, 9, -2, 0)));
            house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, 9, -2, 0)));
            house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, 9, -2, 0)));
            this.old_floor_x.push(-4);
            this.old_floor_x.push(4);
            this.old_floor_x.push(-2);
            this.old_floor_x.push(2);
            this.old_floor_x.push(0);

            this.old_floor_z.push(-2);
            this.old_floor_z.push(-2);
            this.old_floor_z.push(-2);
            this.old_floor_z.push(-2);
            this.old_floor_z.push(-2);

            for (let i = 0; i < 47; i++) //maybe 49
                this.shapes.cube.draw(context, program_state, house_floor_transform[i], this.materials.sand);


            let house_wall_transform = [Mat4.identity().times(Mat4.translation(-6, 11, 0, 0)),
                                        Mat4.identity().times(Mat4.translation(6, 11, 0, 0)),
                                        Mat4.identity().times(Mat4.translation(-6, 11, -12, 0)),
                                        Mat4.identity().times(Mat4.translation(6, 11, -12, 0)),]

            house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, 11, 0, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, 11, 0, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, 11, -12, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, 11, -12, 0)));

            house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, 11, -10, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, 11, -10, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, 11, -2, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, 11, -2, 0)));

            house_wall_transform.push(Mat4.identity().times(Mat4.translation(-2, 11, 0, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(2, 11, 0, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(-2, 11, -12, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(2, 11, -12, 0)));

            house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, 11, -8, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, 11, -8, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, 11, -4, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, 11, -4, 0)));

            house_wall_transform.push(Mat4.identity().times(Mat4.translation(0, 11, -12, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, 11, -6, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, 11, -6, 0)));

            let y_wall = 13;
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, 0, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, 0, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -12, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -12, 0)));

            house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, y_wall, 0, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, y_wall, 0, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, y_wall, -12, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, y_wall, -12, 0)));

            house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -10, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -10, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -2, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -2, 0)));

            house_wall_transform.push(Mat4.identity().times(Mat4.translation(-2, y_wall, 0, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(2, y_wall, 0, 0)));


            y_wall = y_wall + 2;
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, 0, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, 0, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -12, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -12, 0)));

            house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, y_wall, 0, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, y_wall, 0, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, y_wall, -12, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, y_wall, -12, 0)));

            house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -10, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -10, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -2, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -2, 0)));

            house_wall_transform.push(Mat4.identity().times(Mat4.translation(-2, y_wall, 0, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(2, y_wall, 0, 0)));

            house_wall_transform.push(Mat4.identity().times(Mat4.translation(0, y_wall, 0, 0)));

            y_wall = y_wall + 2;
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, 0, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, 0, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -12, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -12, 0)));


            house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, y_wall, 0, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, y_wall, 0, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, y_wall, -12, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, y_wall, -12, 0)));

            house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -10, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -10, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -2, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -2, 0)));


            house_wall_transform.push(Mat4.identity().times(Mat4.translation(-2, y_wall, 0, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(2, y_wall, 0, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(-2, y_wall, -12, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(2, y_wall, -12, 0)));

            house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -8, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -8, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -4, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -4, 0)));


            house_wall_transform.push(Mat4.identity().times(Mat4.translation(0, y_wall, 0, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(0, y_wall, -12, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -6, 0)));
            house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -6, 0)));

            for (let i = 0; i < 76; i++)
                this.shapes.cube.draw(context, program_state, house_wall_transform[i], this.materials.sand);


            let y_roof = 19;
            let house_roof_transform = [Mat4.identity().times(Mat4.translation(-4, y_roof, -2, 0)),
                                        Mat4.identity().times(Mat4.translation(4, y_roof, -2, 0)),
                                        Mat4.identity().times(Mat4.translation(-4, y_roof, -10, 0)),
                                        Mat4.identity().times(Mat4.translation(4, y_roof, -10, 0)),]

            house_roof_transform.push(Mat4.identity().times(Mat4.translation(-2, y_roof, -2, 0)));
            house_roof_transform.push(Mat4.identity().times(Mat4.translation(2, y_roof, -2, 0)));
            house_roof_transform.push(Mat4.identity().times(Mat4.translation(-2, y_roof, -10, 0)));
            house_roof_transform.push(Mat4.identity().times(Mat4.translation(2, y_roof, -10, 0)));

            house_roof_transform.push(Mat4.identity().times(Mat4.translation(-4, y_roof, -4, 0)));
            house_roof_transform.push(Mat4.identity().times(Mat4.translation(4, y_roof, -4, 0)));
            house_roof_transform.push(Mat4.identity().times(Mat4.translation(-4, y_roof, -8, 0)));
            house_roof_transform.push(Mat4.identity().times(Mat4.translation(4, y_roof, -8, 0)));


            house_roof_transform.push(Mat4.identity().times(Mat4.translation(0, y_roof, -2, 0)));
            house_roof_transform.push(Mat4.identity().times(Mat4.translation(0, y_roof, -10, 0)));
            house_roof_transform.push(Mat4.identity().times(Mat4.translation(-4, y_roof, -6, 0)));
            house_roof_transform.push(Mat4.identity().times(Mat4.translation(4, y_roof, -6, 0)));

            y_roof = y_roof + 2;
            house_roof_transform.push(Mat4.identity().times(Mat4.translation(-2, y_roof, -4, 0)));
            house_roof_transform.push(Mat4.identity().times(Mat4.translation(2, y_roof, -4, 0)));
            house_roof_transform.push(Mat4.identity().times(Mat4.translation(-2, y_roof, -8, 0)));
            house_roof_transform.push(Mat4.identity().times(Mat4.translation(2, y_roof, -8, 0)));

            house_roof_transform.push(Mat4.identity().times(Mat4.translation(0, y_roof, -4, 0)));
            house_roof_transform.push(Mat4.identity().times(Mat4.translation(0, y_roof, -8, 0)));
            house_roof_transform.push(Mat4.identity().times(Mat4.translation(2, y_roof, -6, 0)));
            house_roof_transform.push(Mat4.identity().times(Mat4.translation(-2, y_roof, -6, 0)));

            y_roof = y_roof + 2;
            house_roof_transform.push(Mat4.identity().times(Mat4.translation(0, y_roof, -6, 0)));

            for (let i = 0; i < 25; i++)
                this.shapes.cube.draw(context, program_state, house_roof_transform[i], this.materials.sand);

            let floor_y = 9;

            if (this.currtime == 29.36742345)
            {
                this.currtime = Math.floor(t) + 1.0;
            }
            else if (Math.floor(t) == this.currtime)
            {
                for (let i = 0; i < 25; i++)
                {

                    this.house_roof_transform.push(house_roof_transform[i]);

                }
                for (let i = 0; i < 76; i++)
                {
                    this.house_wall_transform.push(house_wall_transform[i]);
                }
                for (let i = 0; i < 47; i++)
                {
                    this.house_floor_transform.push(house_wall_transform[i]);
                }

                this.fall = true;
            }


        }

        if (this.fall)
        {
            if (Math.floor(t) == this.currtime) //1 sec after the sand button is clicked
            {

                for (let i = 0; i < 76; i++)
                    this.shapes.cube.draw(context, program_state, this.house_wall_transform[i], this.materials.sand);


                for (let i = 0; i < 25; i++)
                {
                    //TODO: this doesnt need to be here but for the next 0.5 seconds you will need to add this save for the wall later
                    // this.house_roof_transform[i] = Mat4.identity().times(Mat4.translation(this.old_roof_x[i], floor_y, this.old_roof_z[i], 0));
                    this.shapes.cube.draw(context, program_state, this.house_roof_transform[i], this.materials.sand);
                }



                //top floor y-axis is 9

                let floor_y = 8;
                for (let i = 0; i < 49; i++)
                {
                    this.house_floor_transform[i] = Mat4.identity().times(Mat4.translation(this.old_floor_x[i], floor_y, this.old_floor_z[i], 0));
                    this.shapes.cube.draw(context, program_state, this.house_floor_transform[i], this.materials.sand);
                }
            }

            //TODO: This code below is essentially the exact same thing as the code above, I modified it so that it will be a lot easier to manipulate how we want the cubes to fall
                //TODO: look and compare the code below and above of if and else if statements, then once you get it just replace the entire code below with the one above
            else if (Math.floor(t) < this.currtime + 1.0) //We need this so that the structure doesnt disappear between each time before a second passes
            {
                let house_wall_transform = [Mat4.identity().times(Mat4.translation(-6, 11, 0, 0)),
                    Mat4.identity().times(Mat4.translation(6, 11, 0, 0)),
                    Mat4.identity().times(Mat4.translation(-6, 11, -12, 0)),
                    Mat4.identity().times(Mat4.translation(6, 11, -12, 0)),]

                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, 11, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, 11, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, 11, -12, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, 11, -12, 0)));

                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, 11, -10, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, 11, -10, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, 11, -2, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, 11, -2, 0)));

                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-2, 11, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(2, 11, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-2, 11, -12, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(2, 11, -12, 0)));

                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, 11, -8, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, 11, -8, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, 11, -4, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, 11, -4, 0)));

                house_wall_transform.push(Mat4.identity().times(Mat4.translation(0, 11, -12, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, 11, -6, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, 11, -6, 0)));

                let y_wall = 13;
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -12, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -12, 0)));

                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, y_wall, -12, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, y_wall, -12, 0)));

                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -10, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -10, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -2, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -2, 0)));

                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-2, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(2, y_wall, 0, 0)));


                y_wall = y_wall + 2;
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -12, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -12, 0)));

                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, y_wall, -12, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, y_wall, -12, 0)));

                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -10, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -10, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -2, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -2, 0)));

                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-2, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(2, y_wall, 0, 0)));

                house_wall_transform.push(Mat4.identity().times(Mat4.translation(0, y_wall, 0, 0)));

                y_wall = y_wall + 2;
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -12, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -12, 0)));


                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, y_wall, -12, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, y_wall, -12, 0)));

                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -10, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -10, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -2, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -2, 0)));


                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-2, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(2, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-2, y_wall, -12, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(2, y_wall, -12, 0)));

                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -8, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -8, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -4, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -4, 0)));


                house_wall_transform.push(Mat4.identity().times(Mat4.translation(0, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(0, y_wall, -12, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -6, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -6, 0)));

                for (let i = 0; i < 76; i++)
                    this.shapes.cube.draw(context, program_state, house_wall_transform[i], this.materials.sand);


                let y_roof = 19;
                let house_roof_transform = [Mat4.identity().times(Mat4.translation(-4, y_roof, -2, 0)),
                    Mat4.identity().times(Mat4.translation(4, y_roof, -2, 0)),
                    Mat4.identity().times(Mat4.translation(-4, y_roof, -10, 0)),
                    Mat4.identity().times(Mat4.translation(4, y_roof, -10, 0)),]

                house_roof_transform.push(Mat4.identity().times(Mat4.translation(-2, y_roof, -2, 0)));
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(2, y_roof, -2, 0)));
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(-2, y_roof, -10, 0)));
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(2, y_roof, -10, 0)));

                house_roof_transform.push(Mat4.identity().times(Mat4.translation(-4, y_roof, -4, 0)));
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(4, y_roof, -4, 0)));
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(-4, y_roof, -8, 0)));
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(4, y_roof, -8, 0)));


                house_roof_transform.push(Mat4.identity().times(Mat4.translation(0, y_roof, -2, 0)));
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(0, y_roof, -10, 0)));
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(-4, y_roof, -6, 0)));
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(4, y_roof, -6, 0)));

                y_roof = y_roof + 2;
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(-2, y_roof, -4, 0)));
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(2, y_roof, -4, 0)));
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(-2, y_roof, -8, 0)));
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(2, y_roof, -8, 0)));

                house_roof_transform.push(Mat4.identity().times(Mat4.translation(0, y_roof, -4, 0)));
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(0, y_roof, -8, 0)));
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(2, y_roof, -6, 0)));
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(-2, y_roof, -6, 0)));

                y_roof = y_roof + 2;
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(0, y_roof, -6, 0)));

                for (let i = 0; i < 25; i++)
                    this.shapes.cube.draw(context, program_state, house_roof_transform[i], this.materials.sand);

                let floor_y = 8;
                let house_floor_transform = [Mat4.identity().times(Mat4.translation(-6, floor_y, 0, 0)),
                    Mat4.identity().times(Mat4.translation(6, floor_y, 0, 0)),
                    Mat4.identity().times(Mat4.translation(-6, floor_y, -12, 0)),
                    Mat4.identity().times(Mat4.translation(6, floor_y, -12, 0)),]

                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, floor_y, 0, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, floor_y, 0, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, floor_y, -12, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, floor_y, -12, 0)));


                house_floor_transform.push(Mat4.identity().times(Mat4.translation(6, floor_y, -10, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-6, floor_y, -10, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(6, floor_y, -2, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-6, floor_y, -2, 0)));


                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, floor_y, 0, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, floor_y, 0, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, floor_y, -12, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, floor_y, -12, 0)));

                house_floor_transform.push(Mat4.identity().times(Mat4.translation(6, floor_y, -8, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-6, floor_y, -8, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(6, floor_y, -4, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-6, floor_y, -4, 0)));

                house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, floor_y, 0, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, floor_y, -12, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(6, floor_y, -6, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-6, floor_y, -6, 0)));

                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, floor_y, -10, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, floor_y, -10, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, floor_y, -10, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, floor_y, -10, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, floor_y, -10, 0)));

                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, floor_y, -8, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, floor_y, -8, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, floor_y, -8, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, floor_y, -8, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, floor_y, -8, 0)));

                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, floor_y, -6, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, floor_y, -6, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, floor_y, -6, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, floor_y, -6, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, floor_y, -6, 0)));

                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, floor_y, -4, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, floor_y, -4, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, floor_y, -4, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, floor_y, -4, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, floor_y, -4, 0)));

                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, floor_y, -2, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, floor_y, -2, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, floor_y, -2, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, floor_y, -2, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, floor_y, -2, 0)));

                for (let i = 0; i < 49; i++) {
                    this.shapes.cube.draw(context, program_state, house_floor_transform[i], this.materials.sand);
                }
            }

            if (Math.floor(t) == this.currtime + 1.0)
            {
                let wall_y = 10;
                let house_wall_transform = [Mat4.identity().times(Mat4.translation(-6, wall_y, 0, 0)),
                    Mat4.identity().times(Mat4.translation(6, wall_y, 0, 0)),
                    Mat4.identity().times(Mat4.translation(-6, wall_y, -12, 0)),
                    Mat4.identity().times(Mat4.translation(6, wall_y, -12, 0)),]

                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, wall_y, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, wall_y, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, wall_y, -12, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, wall_y, -12, 0)));

                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, wall_y, -10, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, wall_y, -10, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, wall_y, -2, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, wall_y, -2, 0)));

                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-2, wall_y, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(2, wall_y, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-2, wall_y, -12, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(2, wall_y, -12, 0)));

                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, wall_y, -8, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, wall_y, -8, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, wall_y, -4, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, wall_y, -4, 0)));

                house_wall_transform.push(Mat4.identity().times(Mat4.translation(0, wall_y, -12, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, wall_y, -6, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, wall_y, -6, 0)));

                let y_wall = 13;
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -12, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -12, 0)));

                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, y_wall, -12, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, y_wall, -12, 0)));

                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -10, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -10, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -2, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -2, 0)));

                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-2, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(2, y_wall, 0, 0)));


                y_wall = y_wall + 2;
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -12, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -12, 0)));

                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, y_wall, -12, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, y_wall, -12, 0)));

                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -10, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -10, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -2, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -2, 0)));

                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-2, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(2, y_wall, 0, 0)));

                house_wall_transform.push(Mat4.identity().times(Mat4.translation(0, y_wall, 0, 0)));

                y_wall = y_wall + 2;
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -12, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -12, 0)));


                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, y_wall, -12, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, y_wall, -12, 0)));

                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -10, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -10, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -2, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -2, 0)));


                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-2, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(2, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-2, y_wall, -12, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(2, y_wall, -12, 0)));

                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -8, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -8, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -4, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -4, 0)));


                house_wall_transform.push(Mat4.identity().times(Mat4.translation(0, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(0, y_wall, -12, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -6, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -6, 0)));

                for (let i = 0; i < 76; i++)
                    this.shapes.cube.draw(context, program_state, house_wall_transform[i], this.materials.sand);


                let y_roof = 19;
                let house_roof_transform = [Mat4.identity().times(Mat4.translation(-4, y_roof, -2, 0)),
                    Mat4.identity().times(Mat4.translation(4, y_roof, -2, 0)),
                    Mat4.identity().times(Mat4.translation(-4, y_roof, -10, 0)),
                    Mat4.identity().times(Mat4.translation(4, y_roof, -10, 0)),]

                house_roof_transform.push(Mat4.identity().times(Mat4.translation(-2, y_roof, -2, 0)));
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(2, y_roof, -2, 0)));
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(-2, y_roof, -10, 0)));
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(2, y_roof, -10, 0)));

                house_roof_transform.push(Mat4.identity().times(Mat4.translation(-4, y_roof, -4, 0)));
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(4, y_roof, -4, 0)));
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(-4, y_roof, -8, 0)));
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(4, y_roof, -8, 0)));


                house_roof_transform.push(Mat4.identity().times(Mat4.translation(0, y_roof, -2, 0)));
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(0, y_roof, -10, 0)));
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(-4, y_roof, -6, 0)));
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(4, y_roof, -6, 0)));

                y_roof = y_roof + 2;
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(-2, y_roof, -4, 0)));
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(2, y_roof, -4, 0)));
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(-2, y_roof, -8, 0)));
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(2, y_roof, -8, 0)));

                house_roof_transform.push(Mat4.identity().times(Mat4.translation(0, y_roof, -4, 0)));
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(0, y_roof, -8, 0)));
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(2, y_roof, -6, 0)));
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(-2, y_roof, -6, 0)));

                y_roof = y_roof + 2;
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(0, y_roof, -6, 0)));

                for (let i = 0; i < 25; i++)
                    this.shapes.cube.draw(context, program_state, house_roof_transform[i], this.materials.sand);

                let floor_y = 7;
                let house_floor_transform = [Mat4.identity().times(Mat4.translation(-6, floor_y, 0, 0)),
                    Mat4.identity().times(Mat4.translation(6, floor_y, 0, 0)),
                    Mat4.identity().times(Mat4.translation(-6, floor_y, -12, 0)),
                    Mat4.identity().times(Mat4.translation(6, floor_y, -12, 0)),]

                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, floor_y, 0, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, floor_y, 0, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, floor_y, -12, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, floor_y, -12, 0)));


                house_floor_transform.push(Mat4.identity().times(Mat4.translation(6, floor_y, -10, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-6, floor_y, -10, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(6, floor_y, -2, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-6, floor_y, -2, 0)));


                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, floor_y, 0, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, floor_y, 0, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, floor_y, -12, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, floor_y, -12, 0)));

                house_floor_transform.push(Mat4.identity().times(Mat4.translation(6, floor_y, -8, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-6, floor_y, -8, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(6, floor_y, -4, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-6, floor_y, -4, 0)));

                house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, floor_y, 0, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, floor_y, -12, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(6, floor_y, -6, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-6, floor_y, -6, 0)));

                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, floor_y, -10, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, floor_y, -10, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, floor_y, -10, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, floor_y, -10, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, floor_y, -10, 0)));

                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, floor_y, -8, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, floor_y, -8, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, floor_y, -8, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, floor_y, -8, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, floor_y, -8, 0)));

                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, floor_y, -6, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, floor_y, -6, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, floor_y, -6, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, floor_y, -6, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, floor_y, -6, 0)));

                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, floor_y, -4, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, floor_y, -4, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, floor_y, -4, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, floor_y, -4, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, floor_y, -4, 0)));

                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, floor_y, -2, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, floor_y, -2, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, floor_y, -2, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, floor_y, -2, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, floor_y, -2, 0)));

                for (let i = 0; i < 49; i++)
                {
                    this.shapes.cube.draw(context, program_state, house_floor_transform[i], this.materials.sand);
                }
            }
            else if (Math.floor(t) < this.currtime + 2.0 && Math.floor(t) > this.currtime + 1.0)
            {
                let wall_y = 10;
                let house_wall_transform = [Mat4.identity().times(Mat4.translation(-6, wall_y, 0, 0)),
                    Mat4.identity().times(Mat4.translation(6, wall_y, 0, 0)),
                    Mat4.identity().times(Mat4.translation(-6, wall_y, -12, 0)),
                    Mat4.identity().times(Mat4.translation(6, wall_y, -12, 0)),]

                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, wall_y, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, wall_y, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, wall_y, -12, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, wall_y, -12, 0)));

                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, wall_y, -10, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, wall_y, -10, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, wall_y, -2, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, wall_y, -2, 0)));

                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-2, wall_y, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(2, wall_y, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-2, wall_y, -12, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(2, wall_y, -12, 0)));

                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, wall_y, -8, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, wall_y, -8, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, wall_y, -4, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, wall_y, -4, 0)));

                house_wall_transform.push(Mat4.identity().times(Mat4.translation(0, wall_y, -12, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, wall_y, -6, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, wall_y, -6, 0)));

                let y_wall = 13;
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -12, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -12, 0)));

                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, y_wall, -12, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, y_wall, -12, 0)));

                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -10, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -10, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -2, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -2, 0)));

                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-2, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(2, y_wall, 0, 0)));


                y_wall = y_wall + 2;
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -12, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -12, 0)));

                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, y_wall, -12, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, y_wall, -12, 0)));

                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -10, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -10, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -2, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -2, 0)));

                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-2, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(2, y_wall, 0, 0)));

                house_wall_transform.push(Mat4.identity().times(Mat4.translation(0, y_wall, 0, 0)));

                y_wall = y_wall + 2;
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -12, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -12, 0)));


                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, y_wall, -12, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, y_wall, -12, 0)));

                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -10, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -10, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -2, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -2, 0)));


                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-2, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(2, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-2, y_wall, -12, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(2, y_wall, -12, 0)));

                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -8, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -8, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -4, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -4, 0)));


                house_wall_transform.push(Mat4.identity().times(Mat4.translation(0, y_wall, 0, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(0, y_wall, -12, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -6, 0)));
                house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -6, 0)));

                for (let i = 0; i < 76; i++)
                    this.shapes.cube.draw(context, program_state, house_wall_transform[i], this.materials.sand);


                let y_roof = 19;
                let house_roof_transform = [Mat4.identity().times(Mat4.translation(-4, y_roof, -2, 0)),
                    Mat4.identity().times(Mat4.translation(4, y_roof, -2, 0)),
                    Mat4.identity().times(Mat4.translation(-4, y_roof, -10, 0)),
                    Mat4.identity().times(Mat4.translation(4, y_roof, -10, 0)),]

                house_roof_transform.push(Mat4.identity().times(Mat4.translation(-2, y_roof, -2, 0)));
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(2, y_roof, -2, 0)));
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(-2, y_roof, -10, 0)));
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(2, y_roof, -10, 0)));

                house_roof_transform.push(Mat4.identity().times(Mat4.translation(-4, y_roof, -4, 0)));
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(4, y_roof, -4, 0)));
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(-4, y_roof, -8, 0)));
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(4, y_roof, -8, 0)));


                house_roof_transform.push(Mat4.identity().times(Mat4.translation(0, y_roof, -2, 0)));
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(0, y_roof, -10, 0)));
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(-4, y_roof, -6, 0)));
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(4, y_roof, -6, 0)));

                y_roof = y_roof + 2;
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(-2, y_roof, -4, 0)));
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(2, y_roof, -4, 0)));
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(-2, y_roof, -8, 0)));
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(2, y_roof, -8, 0)));

                house_roof_transform.push(Mat4.identity().times(Mat4.translation(0, y_roof, -4, 0)));
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(0, y_roof, -8, 0)));
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(2, y_roof, -6, 0)));
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(-2, y_roof, -6, 0)));

                y_roof = y_roof + 2;
                house_roof_transform.push(Mat4.identity().times(Mat4.translation(0, y_roof, -6, 0)));

                for (let i = 0; i < 25; i++)
                    this.shapes.cube.draw(context, program_state, house_roof_transform[i], this.materials.sand);

                let floor_y = 7;
                let house_floor_transform = [Mat4.identity().times(Mat4.translation(-6, floor_y, 0, 0)),
                    Mat4.identity().times(Mat4.translation(6, floor_y, 0, 0)),
                    Mat4.identity().times(Mat4.translation(-6, floor_y, -12, 0)),
                    Mat4.identity().times(Mat4.translation(6, floor_y, -12, 0)),]

                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, floor_y, 0, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, floor_y, 0, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, floor_y, -12, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, floor_y, -12, 0)));


                house_floor_transform.push(Mat4.identity().times(Mat4.translation(6, floor_y, -10, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-6, floor_y, -10, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(6, floor_y, -2, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-6, floor_y, -2, 0)));


                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, floor_y, 0, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, floor_y, 0, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, floor_y, -12, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, floor_y, -12, 0)));

                house_floor_transform.push(Mat4.identity().times(Mat4.translation(6, floor_y, -8, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-6, floor_y, -8, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(6, floor_y, -4, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-6, floor_y, -4, 0)));

                house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, floor_y, 0, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, floor_y, -12, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(6, floor_y, -6, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-6, floor_y, -6, 0)));

                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, floor_y, -10, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, floor_y, -10, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, floor_y, -10, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, floor_y, -10, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, floor_y, -10, 0)));

                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, floor_y, -8, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, floor_y, -8, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, floor_y, -8, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, floor_y, -8, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, floor_y, -8, 0)));

                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, floor_y, -6, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, floor_y, -6, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, floor_y, -6, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, floor_y, -6, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, floor_y, -6, 0)));

                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, floor_y, -4, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, floor_y, -4, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, floor_y, -4, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, floor_y, -4, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, floor_y, -4, 0)));

                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, floor_y, -2, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, floor_y, -2, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, floor_y, -2, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, floor_y, -2, 0)));
                house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, floor_y, -2, 0)));

                for (let i = 0; i < 49; i++)
                {
                    this.shapes.cube.draw(context, program_state, house_floor_transform[i], this.materials.sand);
                }
            }

             if (Math.floor(t) == this.currtime + 2.0)
             {
                 let wall_y = 9;
                 let house_wall_transform = [Mat4.identity().times(Mat4.translation(-6, wall_y, 0, 0)),
                     Mat4.identity().times(Mat4.translation(6, wall_y, 0, 0)),
                     Mat4.identity().times(Mat4.translation(-6, wall_y, -12, 0)),
                     Mat4.identity().times(Mat4.translation(6, wall_y, -12, 0)),]

                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, wall_y, 0, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, wall_y, 0, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, wall_y, -12, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, wall_y, -12, 0)));

                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, wall_y, -10, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, wall_y, -10, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, wall_y, -2, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, wall_y, -2, 0)));

                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(-2, wall_y, 0, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(2, wall_y, 0, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(-2, wall_y, -12, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(2, wall_y, -12, 0)));

                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, wall_y, -8, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, wall_y, -8, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, wall_y, -4, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, wall_y, -4, 0)));

                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(0, wall_y, -12, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, wall_y, -6, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, wall_y, -6, 0)));

                 let y_wall = 12;
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, 0, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, 0, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -12, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -12, 0)));

                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, y_wall, 0, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, y_wall, 0, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, y_wall, -12, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, y_wall, -12, 0)));

                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -10, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -10, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -2, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -2, 0)));

                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(-2, y_wall, 0, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(2, y_wall, 0, 0)));


                 y_wall = 13 + 2;
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, 0, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, 0, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -12, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -12, 0)));

                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, y_wall, 0, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, y_wall, 0, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, y_wall, -12, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, y_wall, -12, 0)));

                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -10, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -10, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -2, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -2, 0)));

                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(-2, y_wall, 0, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(2, y_wall, 0, 0)));

                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(0, y_wall, 0, 0)));

                 y_wall = y_wall + 2;
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, 0, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, 0, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -12, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -12, 0)));


                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, y_wall, 0, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, y_wall, 0, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(-4, y_wall, -12, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(4, y_wall, -12, 0)));

                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -10, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -10, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -2, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -2, 0)));


                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(-2, y_wall, 0, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(2, y_wall, 0, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(-2, y_wall, -12, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(2, y_wall, -12, 0)));

                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -8, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -8, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -4, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -4, 0)));


                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(0, y_wall, 0, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(0, y_wall, -12, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -6, 0)));
                 house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -6, 0)));

                 for (let i = 0; i < 76; i++)
                     this.shapes.cube.draw(context, program_state, house_wall_transform[i], this.materials.sand);


                 let y_roof = 19;
                 let house_roof_transform = [Mat4.identity().times(Mat4.translation(-4, y_roof, -2, 0)),
                     Mat4.identity().times(Mat4.translation(4, y_roof, -2, 0)),
                     Mat4.identity().times(Mat4.translation(-4, y_roof, -10, 0)),
                     Mat4.identity().times(Mat4.translation(4, y_roof, -10, 0)),]

                 house_roof_transform.push(Mat4.identity().times(Mat4.translation(-2, y_roof, -2, 0)));
                 house_roof_transform.push(Mat4.identity().times(Mat4.translation(2, y_roof, -2, 0)));
                 house_roof_transform.push(Mat4.identity().times(Mat4.translation(-2, y_roof, -10, 0)));
                 house_roof_transform.push(Mat4.identity().times(Mat4.translation(2, y_roof, -10, 0)));

                 house_roof_transform.push(Mat4.identity().times(Mat4.translation(-4, y_roof, -4, 0)));
                 house_roof_transform.push(Mat4.identity().times(Mat4.translation(4, y_roof, -4, 0)));
                 house_roof_transform.push(Mat4.identity().times(Mat4.translation(-4, y_roof, -8, 0)));
                 house_roof_transform.push(Mat4.identity().times(Mat4.translation(4, y_roof, -8, 0)));


                 house_roof_transform.push(Mat4.identity().times(Mat4.translation(0, y_roof, -2, 0)));
                 house_roof_transform.push(Mat4.identity().times(Mat4.translation(0, y_roof, -10, 0)));
                 house_roof_transform.push(Mat4.identity().times(Mat4.translation(-4, y_roof, -6, 0)));
                 house_roof_transform.push(Mat4.identity().times(Mat4.translation(4, y_roof, -6, 0)));

                 y_roof = y_roof + 2;
                 house_roof_transform.push(Mat4.identity().times(Mat4.translation(-2, y_roof, -4, 0)));
                 house_roof_transform.push(Mat4.identity().times(Mat4.translation(2, y_roof, -4, 0)));
                 house_roof_transform.push(Mat4.identity().times(Mat4.translation(-2, y_roof, -8, 0)));
                 house_roof_transform.push(Mat4.identity().times(Mat4.translation(2, y_roof, -8, 0)));

                 house_roof_transform.push(Mat4.identity().times(Mat4.translation(0, y_roof, -4, 0)));
                 house_roof_transform.push(Mat4.identity().times(Mat4.translation(0, y_roof, -8, 0)));
                 house_roof_transform.push(Mat4.identity().times(Mat4.translation(2, y_roof, -6, 0)));
                 house_roof_transform.push(Mat4.identity().times(Mat4.translation(-2, y_roof, -6, 0)));

                 y_roof = y_roof + 2;
                 house_roof_transform.push(Mat4.identity().times(Mat4.translation(0, y_roof, -6, 0)));

                 for (let i = 0; i < 25; i++)
                     this.shapes.cube.draw(context, program_state, house_roof_transform[i], this.materials.sand);

                 let floor_y = 6;
                 let house_floor_transform = [Mat4.identity().times(Mat4.translation(-6, floor_y, 0, 0)),
                     Mat4.identity().times(Mat4.translation(6, floor_y, 0, 0)),
                     Mat4.identity().times(Mat4.translation(-6, floor_y, -12, 0)),
                     Mat4.identity().times(Mat4.translation(6, floor_y, -12, 0)),]

                 house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, floor_y, 0, 0)));
                 house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, floor_y, 0, 0)));
                 house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, floor_y, -12, 0)));
                 house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, floor_y, -12, 0)));


                 house_floor_transform.push(Mat4.identity().times(Mat4.translation(6, floor_y, -10, 0)));
                 house_floor_transform.push(Mat4.identity().times(Mat4.translation(-6, floor_y, -10, 0)));
                 house_floor_transform.push(Mat4.identity().times(Mat4.translation(6, floor_y, -2, 0)));
                 house_floor_transform.push(Mat4.identity().times(Mat4.translation(-6, floor_y, -2, 0)));


                 house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, floor_y, 0, 0)));
                 house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, floor_y, 0, 0)));
                 house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, floor_y, -12, 0)));
                 house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, floor_y, -12, 0)));

                 house_floor_transform.push(Mat4.identity().times(Mat4.translation(6, floor_y, -8, 0)));
                 house_floor_transform.push(Mat4.identity().times(Mat4.translation(-6, floor_y, -8, 0)));
                 house_floor_transform.push(Mat4.identity().times(Mat4.translation(6, floor_y, -4, 0)));
                 house_floor_transform.push(Mat4.identity().times(Mat4.translation(-6, floor_y, -4, 0)));

                 house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, floor_y, 0, 0)));
                 house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, floor_y, -12, 0)));
                 house_floor_transform.push(Mat4.identity().times(Mat4.translation(6, floor_y, -6, 0)));
                 house_floor_transform.push(Mat4.identity().times(Mat4.translation(-6, floor_y, -6, 0)));

                 house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, floor_y, -10, 0)));
                 house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, floor_y, -10, 0)));
                 house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, floor_y, -10, 0)));
                 house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, floor_y, -10, 0)));
                 house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, floor_y, -10, 0)));

                 house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, floor_y, -8, 0)));
                 house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, floor_y, -8, 0)));
                 house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, floor_y, -8, 0)));
                 house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, floor_y, -8, 0)));
                 house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, floor_y, -8, 0)));

                 house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, floor_y, -6, 0)));
                 house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, floor_y, -6, 0)));
                 house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, floor_y, -6, 0)));
                 house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, floor_y, -6, 0)));
                 house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, floor_y, -6, 0)));

                 house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, floor_y, -4, 0)));
                 house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, floor_y, -4, 0)));
                 house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, floor_y, -4, 0)));
                 house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, floor_y, -4, 0)));
                 house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, floor_y, -4, 0)));

                 house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, floor_y, -2, 0)));
                 house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, floor_y, -2, 0)));
                 house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, floor_y, -2, 0)));
                 house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, floor_y, -2, 0)));
                 house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, floor_y, -2, 0)));

                 for (let i = 0; i < 49; i++)
                 {
                     this.shapes.cube.draw(context, program_state, house_floor_transform[i], this.materials.sand);
                 }
             }
             else if(Math.floor(t) < this.currtime + 3.0 && Math.floor(t) > this.currtime + 2.0)
             {


             }


        }








        let floor_transformation = Mat4.identity();
        floor_transformation = floor_transformation.times(Mat4.rotation(Math.PI/2,1,0,0)).times(Mat4.scale(100,100,1));
        this.shapes.floor.arrays.texture_coord.forEach(
            (v,i,l) => l[i] = vec(v[0],v[1]).times(100)
        )

        this.shapes.floor.draw(context, program_state, floor_transformation, this.materials.grass_jpg);

        let sky_transform = Mat4.identity();
        sky_transform = sky_transform.times(Mat4.translation(0,10,0)).times(Mat4.scale(50,50,50));
        this.shapes.sky_sphere.draw(context,program_state,sky_transform,this.materials.sky_png);


    }
}
