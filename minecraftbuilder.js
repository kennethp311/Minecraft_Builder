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
            sun: new defs.Subdivision_Sphere(4),
        };

        // *** Materials
        this.materials = {
            sun_material: new Material(new defs.Phong_Shader(), {ambient: 1, diffusivity: 0, specularity:0, color: hex_color("#ffffff")}),

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
            tree: new Material(new Textured_Phong(),{
                color: hex_color("#000000"),
                ambient: 1,
                texture: new Texture("assets/tree.png", "LINEAR_MIPMAP_LINEAR")
            }),
            leaf: new Material(new Textured_Phong(),{
                color: hex_color("#000000"),
                ambient: 1,
                texture: new Texture("assets/leaf.png", "LINEAR_MIPMAP_LINEAR")
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

        this.layers_x = [[],[]];
        this.layers_z = [[],[]];
        this.layers_x[0] = []; //9
        this.layers_x[1] = []; //11
        this.layers_x[2] = []; //13
        this.layers_x[3] = []; //15
        this.layers_x[4] = []; //17
        this.layers_x[5] = []; //19
        this.layers_x[6] = []; //21
        this.layers_x[7] = []; //23
        this.layers_z[0] = [];
        this.layers_z[1] = [];
        this.layers_z[2] = [];
        this.layers_z[3] = [];
        this.layers_z[4] = [];
        this.layers_z[5] = [];
        this.layers_z[6] = [];
        this.layers_z[7] = [];
        this.layers_x[0][0] = -6;
        this.layers_x[0][1] = 6;
        this.layers_x[0][2] = -6;
        this.layers_x[0][3] = 6;
        this.layers_z[0][0] = 0;
        this.layers_z[0][1] = 0;
        this.layers_z[0][2] = -12;
        this.layers_z[0][3] = -12;
        this.layers_x[0][4] = -4;
        this.layers_x[0][5] = 4;
        this.layers_x[0][6] = 4;
        this.layers_x[0][7] = -4;
        this.layers_z[0][4] = 0;
        this.layers_z[0][5] = 0;
        this.layers_z[0][6] = -12;
        this.layers_z[0][7] = -12;
        this.layers_x[0][8] = 6;
        this.layers_x[0][9] = -6;
        this.layers_x[0][10] = 6;
        this.layers_x[0][11] = -6;
        this.layers_z[0][8] = -10;
        this.layers_z[0][9] = -10;
        this.layers_z[0][10] = -2;
        this.layers_z[0][11] = -2;
        this.layers_x[0][12] = -2;
        this.layers_x[0][13] = 2;
        this.layers_x[0][14] = 2;
        this.layers_x[0][15] = -2;
        this.layers_z[0][12] = 0;
        this.layers_z[0][13] = 0;
        this.layers_z[0][14] = -12;
        this.layers_z[0][15] = -12;
        this.layers_x[0][16] = 6;
        this.layers_x[0][17] = -6;
        this.layers_x[0][18] = 6;
        this.layers_x[0][19] = -6;
        this.layers_z[0][16] = -8;
        this.layers_z[0][17] = -8;
        this.layers_z[0][18] = -4;
        this.layers_z[0][19] = -4;
        this.layers_x[0][20] = 0;
        this.layers_x[0][21] = 0;
        this.layers_x[0][22] = 6;
        this.layers_x[0][23] = -6;
        this.layers_z[0][20] = 0;
        this.layers_z[0][21] = -12;
        this.layers_z[0][22] = -6;
        this.layers_z[0][23] = -6;
        this.layers_x[0][24] = 0;
        this.layers_x[0][25] = 0;
        this.layers_x[0][26] = 6;
        this.layers_x[0][27] = -6;
        this.layers_z[0][24] = 0;
        this.layers_z[0][25] = -12;
        this.layers_z[0][26] = -6;
        this.layers_z[0][27] = -6;
        this.layers_x[0][28] = -4;
        this.layers_x[0][29] = 4;
        this.layers_x[0][30] = -2;
        this.layers_x[0][31] = 2;
        this.layers_x[0][32] = 0;
        this.layers_z[0][28] = -8;
        this.layers_z[0][29] = -8;
        this.layers_z[0][30] = -8;
        this.layers_z[0][31] = -8;
        this.layers_z[0][32] = -8;
        this.layers_x[0][33] = -4;
        this.layers_x[0][34] = 4;
        this.layers_x[0][35] = -2;
        this.layers_x[0][36] = 2;
        this.layers_x[0][37] = 0;
        this.layers_z[0][33] = -6;
        this.layers_z[0][34] = -6;
        this.layers_z[0][35] = -6;
        this.layers_z[0][36] = -6;
        this.layers_z[0][37] = -6;
        this.layers_x[0][38] = -4;
        this.layers_x[0][39] = 4;
        this.layers_x[0][40] = -2;
        this.layers_x[0][41] = 2;
        this.layers_x[0][42] = 0;
        this.layers_z[0][38] = -4;
        this.layers_z[0][39] = -4;
        this.layers_z[0][40] = -4;
        this.layers_z[0][41] = -4;
        this.layers_z[0][42] = -4;
        this.layers_x[0][43] = -4;
        this.layers_x[0][44] = 4;
        this.layers_x[0][45] = -2;
        this.layers_x[0][46] = 2;
        this.layers_x[0][47] = 0;
        this.layers_z[0][43] = -2;
        this.layers_z[0][44] = -2;
        this.layers_z[0][45] = -2;
        this.layers_z[0][46] = -2;
        this.layers_z[0][47] = -2;

        this.layers_x[1][0] = -6;
        this.layers_x[1][1] = 6;
        this.layers_x[1][2] = -6;
        this.layers_x[1][3] = 6;

        this.layers_z[1][0] = 0;
        this.layers_z[1][1] = 0;
        this.layers_z[1][2] = -12;
        this.layers_z[1][3] = -12;

        this.layers_x[1][4] = -4;
        this.layers_x[1][5] = 4;
        this.layers_x[1][6] = -4;
        this.layers_x[1][7] = 4;

        this.layers_z[1][4] = 0;
        this.layers_z[1][5] = 0;
        this.layers_z[1][6] = -12;
        this.layers_z[1][7] = -12;

        this.layers_x[1][8] = -6;
        this.layers_x[1][9] = 6;
        this.layers_x[1][10] = -6;
        this.layers_x[1][11] = 6;

        this.layers_z[1][8] = -10;
        this.layers_z[1][9] = -10;
        this.layers_z[1][10] = -2;
        this.layers_z[1][11] = -2;

        this.layers_x[1][12] = -2;
        this.layers_x[1][13] = 2;
        this.layers_x[1][14] = -2;
        this.layers_x[1][15] = 2;

        this.layers_z[1][12] = 0;
        this.layers_z[1][13] = 0;
        this.layers_z[1][14] = -12;
        this.layers_z[1][15] = -12;

        this.layers_x[1][16] = -6;
        this.layers_x[1][17] = 6;
        this.layers_x[1][18] = -6;
        this.layers_x[1][19] = 6;

        this.layers_z[1][16] = -8;
        this.layers_z[1][17] = -8;
        this.layers_z[1][18] = -4;
        this.layers_z[1][19] = -4;

        this.layers_x[1][16] = 0;
        this.layers_x[1][17] = -6;
        this.layers_x[1][18] = 6;

        this.layers_z[1][16] = -12;
        this.layers_z[1][17] = -6;
        this.layers_z[1][18] = -6;

        this.layers_x[2][0] = -6;
        this.layers_x[2][1] = 6;
        this.layers_x[2][2] = -6;
        this.layers_x[2][3] = 6;
        this.layers_z[2][0] = 0;
        this.layers_z[2][1] = 0;
        this.layers_z[2][2] = -12;
        this.layers_z[2][3] = -12;
        this.layers_x[2][4] = -4;
        this.layers_x[2][5] = 4;
        this.layers_x[2][6] = -4;
        this.layers_x[2][7] = 4;
        this.layers_z[2][4] = 0;
        this.layers_z[2][5] = 0;
        this.layers_z[2][6] = -12;
        this.layers_z[2][7] = -12;
        this.layers_x[2][8] = -6;
        this.layers_x[2][9] = 6;
        this.layers_x[2][10] = -6;
        this.layers_x[2][11] = 6;
        this.layers_z[2][8] = -10;
        this.layers_z[2][9] = -10;
        this.layers_z[2][10] = -2;
        this.layers_z[2][11] = -2;
        this.layers_x[2][12] = -2;
        this.layers_x[2][13] = 2;
        this.layers_z[2][12] = 0;
        this.layers_z[2][13] = 0;
        this.layers_x[3][0] = -6;
        this.layers_x[3][1] = 6;
        this.layers_x[3][2] = -6;
        this.layers_x[3][3] = 6;
        this.layers_z[3][0] = 0;
        this.layers_z[3][1] = 0;
        this.layers_z[3][2] = -12;
        this.layers_z[3][3] = -12;
        this.layers_x[3][4] = -4;
        this.layers_x[3][5] = 4;
        this.layers_x[3][6] = -4;
        this.layers_x[3][7] = 4;
        this.layers_z[3][4] = 0;
        this.layers_z[3][5] = 0;
        this.layers_z[3][6] = -12;
        this.layers_z[3][7] = -12;
        this.layers_x[3][8] = -6;
        this.layers_x[3][9] = 6;
        this.layers_x[3][10] = -6;
        this.layers_x[3][11] = 6;
        this.layers_z[3][8] = -10;
        this.layers_z[3][9] = -10;
        this.layers_z[3][10] = -2;
        this.layers_z[3][11] = -2;
        this.layers_x[3][12] = -2;
        this.layers_x[3][13] = 2;
        this.layers_x[3][14] = 0;
        this.layers_z[3][12] = 0;
        this.layers_z[3][13] = 0;
        this.layers_z[3][14] = 0;
        this.layers_x[4][0] = -6;
        this.layers_x[4][1] = 6;
        this.layers_x[4][2] = -6;
        this.layers_x[4][3] = 6;
        this.layers_z[4][0] = 0;
        this.layers_z[4][1] = 0;
        this.layers_z[4][2] = -12;
        this.layers_z[4][3] = -12;
        this.layers_x[4][4] = -4;
        this.layers_x[4][5] = 4;
        this.layers_x[4][6] = 4;
        this.layers_x[4][7] = -4;
        this.layers_z[4][4] = 0;
        this.layers_z[4][5] = 0;
        this.layers_z[4][6] = -12;
        this.layers_z[4][7] = -12;
        this.layers_x[4][8] = 6;
        this.layers_x[4][9] = -6;
        this.layers_x[4][10] = 6;
        this.layers_x[4][11] = -6;
        this.layers_z[4][8] = -10;
        this.layers_z[4][9] = -10;
        this.layers_z[4][10] = -2;
        this.layers_z[4][11] = -2;
        this.layers_x[4][12] = -2;
        this.layers_x[4][13] = 2;
        this.layers_x[4][14] = 2;
        this.layers_x[4][15] = -2;
        this.layers_z[4][12] = 0;
        this.layers_z[4][13] = 0;
        this.layers_z[4][14] = -12;
        this.layers_z[4][15] = -12;
        this.layers_x[4][16] = 6;
        this.layers_x[4][17] = -6;
        this.layers_x[4][18] = 6;
        this.layers_x[4][19] = -6;
        this.layers_z[4][16] = -8;
        this.layers_z[4][17] = -8;
        this.layers_z[4][18] = -4;
        this.layers_z[4][19] = -4;
        this.layers_x[4][20] = 0;
        this.layers_x[4][21] = 0;
        this.layers_x[4][22] = 6;
        this.layers_x[4][23] = -6;
        this.layers_z[4][20] = 0;
        this.layers_z[4][21] = -12;
        this.layers_z[4][22] = -6;
        this.layers_z[4][23] = -6;
        this.layers_x[4][24] = 0;
        this.layers_x[4][25] = 0;
        this.layers_x[4][26] = 6;
        this.layers_x[4][27] = -6;
        this.layers_z[4][24] = 0;
        this.layers_z[4][25] = -12;
        this.layers_z[4][26] = -6;
        this.layers_z[4][27] = -6;
        this.layers_x[4][28] = -4;
        this.layers_x[4][29] = 4;
        this.layers_x[4][30] = -2;
        this.layers_x[4][31] = 2;
        this.layers_x[4][32] = 0;
        this.layers_z[4][28] = -8;
        this.layers_z[4][29] = -8;
        this.layers_z[4][30] = -8;
        this.layers_z[4][31] = -8;
        this.layers_z[4][32] = -8;
        this.layers_x[4][33] = -4;
        this.layers_x[4][34] = 4;
        this.layers_x[4][35] = -2;
        this.layers_x[4][36] = 2;
        this.layers_x[4][37] = 0;
        this.layers_z[4][33] = -6;
        this.layers_z[4][34] = -6;
        this.layers_z[4][35] = -6;
        this.layers_z[4][36] = -6;
        this.layers_z[4][37] = -6;
        this.layers_x[4][38] = -4;
        this.layers_x[4][39] = 4;
        this.layers_x[4][40] = -2;
        this.layers_x[4][41] = 2;
        this.layers_x[4][42] = 0;
        this.layers_z[4][38] = -4;
        this.layers_z[4][39] = -4;
        this.layers_z[4][40] = -4;
        this.layers_z[4][41] = -4;
        this.layers_z[4][42] = -4;
        this.layers_x[4][43] = -4;
        this.layers_x[4][44] = 4;
        this.layers_x[4][45] = -2;
        this.layers_x[4][46] = 2;
        this.layers_x[4][47] = 0;
        this.layers_z[4][43] = -2;
        this.layers_z[4][44] = -2;
        this.layers_z[4][45] = -2;
        this.layers_z[4][46] = -2;
        this.layers_z[4][47] = -2;
        this.layers_x[5][0] = -4;
        this.layers_x[5][1] = 4;
        this.layers_x[5][2] = -4;
        this.layers_x[5][3] = 4;
        this.layers_z[5][0] = -2;
        this.layers_z[5][1] = -2;
        this.layers_z[5][2] = -10;
        this.layers_z[5][3] = -10;
        this.layers_x[5][4] = -2;
        this.layers_x[5][5] = 2;
        this.layers_x[5][6] = -2;
        this.layers_x[5][7] = 2;
        this.layers_z[5][4] = -2;
        this.layers_z[5][5] = -2;
        this.layers_z[5][6] = -10;
        this.layers_z[5][7] = -10;
        this.layers_x[5][8] = -4;
        this.layers_x[5][9] = 4;
        this.layers_x[5][10] = -4;
        this.layers_x[5][11] = 4;
        this.layers_z[5][8] = -4;
        this.layers_z[5][9] = -4;
        this.layers_z[5][10] = -8;
        this.layers_z[5][11] = -8;
        this.layers_x[5][12] = 0;
        this.layers_x[5][13] = 0;
        this.layers_x[5][14] = -4;
        this.layers_x[5][15] = 4;
        this.layers_z[5][12] = -2;
        this.layers_z[5][13] = -10;
        this.layers_z[5][14] = -6;
        this.layers_z[5][15] = -6;
        this.layers_x[6][0] = -2;
        this.layers_x[6][1] = 2;
        this.layers_x[6][2] = -2;
        this.layers_x[6][3] = 2;
        this.layers_z[6][0] = -4;
        this.layers_z[6][1] = -4;
        this.layers_z[6][2] = -8;
        this.layers_z[6][3] = -8;
        this.layers_x[6][4] = 0;
        this.layers_x[6][5] = 0;
        this.layers_x[6][6] = 2;
        this.layers_x[6][7] = -2;
        this.layers_z[6][4] = -4;
        this.layers_z[6][5] = -8;
        this.layers_z[6][6] = -6;
        this.layers_z[6][7] = -6;
        this.layers_x[7][0] = 0;
        this.layers_z[7][0] = -6;

        this.floor_y = 9;
        this.layer = 0;

        this.counter = 0;

    }

    make_control_panel() {
        this.key_triggered_button("Delete Pillars", ["c"], () => this.pillar_exist = !this.pillar_exist);

        this.key_triggered_button("Turn House into sand", ["k"], () => this.sand_house = !this.sand_house);

       //this.key_triggered_button("Delete Base", ["c"], this.set_colors);
       // this.key_triggered_button("Turn House in to Sand", ["s"], this.set_colors);
    }


    sand_falling_transformation(context, program_state){
        if(this.layer == 0){
            for (let i = 0; i < 47; i++) {
                this.house_floor_transform[i] = Mat4.identity().times(Mat4.translation(this.layers_x[0][i], this.floor_y, this.layers_z[0][i], 0));
                this.shapes.cube.draw(context, program_state, this.house_floor_transform[i], this.materials.sand);
            }
            for(let i = 0; i < 19; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[1][i], 11, this.layers_z[1][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            for (let i = 0; i < 14; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[2][i], 13, this.layers_z[2][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            for (let i = 0; i < 15; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[3][i], 15, this.layers_z[3][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            for (let i = 0; i < 48; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[4][i], 17, this.layers_z[4][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }

            for(let i = 0; i < 16; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[5][i], 19, this.layers_z[5][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            for(let i = 0; i < 8; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[6][i], 21, this.layers_z[6][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[7][0], 23, this.layers_z[7][0]));
            this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);

        }
        if(this.layer == 1){
            for (let i = 0; i < 47; i++) {
                this.house_floor_transform[i] = Mat4.identity().times(Mat4.translation(this.layers_x[0][i], this.floor_y, this.layers_z[0][i], 0));
                this.shapes.cube.draw(context, program_state, this.house_floor_transform[i], this.materials.sand);
            }
            for(let i = 0; i < 19; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[1][i], this.floor_y +2.5, this.layers_z[1][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            for (let i = 0; i < 14; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[2][i], 13, this.layers_z[2][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            for (let i = 0; i < 15; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[3][i], 15, this.layers_z[3][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            for (let i = 0; i < 48; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[4][i], 17, this.layers_z[4][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }

            for(let i = 0; i < 16; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[5][i], 19, this.layers_z[5][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            for(let i = 0; i < 8; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[6][i], 21, this.layers_z[6][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            let temp_trans1 = Mat4.identity().times(Mat4.translation(this.layers_x[7][0], 23, this.layers_z[7][0]));
            this.shapes.cube.draw(context, program_state, temp_trans1, this.materials.sand);

        }

        if(this.layer == 2){
            for (let i = 0; i < 47; i++) {
                this.house_floor_transform[i] = Mat4.identity().times(Mat4.translation(this.layers_x[0][i], this.floor_y, this.layers_z[0][i], 0));
                this.shapes.cube.draw(context, program_state, this.house_floor_transform[i], this.materials.sand);
            }
            for(let i = 0; i < 19; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[1][i], this.floor_y + 2.5, this.layers_z[1][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            for (let i = 0; i < 14; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[2][i], this.floor_y + 5, this.layers_z[2][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            for (let i = 0; i < 15; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[3][i], 15, this.layers_z[3][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            for (let i = 0; i < 48; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[4][i], 17, this.layers_z[4][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }

            for(let i = 0; i < 16; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[5][i], 19, this.layers_z[5][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            for(let i = 0; i < 8; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[6][i], 21, this.layers_z[6][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            let temp_trans1 = Mat4.identity().times(Mat4.translation(this.layers_x[7][0], 23, this.layers_z[7][0]));
            this.shapes.cube.draw(context, program_state, temp_trans1, this.materials.sand);

        }
        if(this.layer == 3){
            let temp = 0;
            if(this.floor_y < 1){
                temp = 1;
            }
            else{
                temp = this.floor_y;
            }
            for (let i = 0; i < 47; i++) {
                this.house_floor_transform[i] = Mat4.identity().times(Mat4.translation(this.layers_x[0][i], this.floor_y, this.layers_z[0][i], 0));
                this.shapes.cube.draw(context, program_state, this.house_floor_transform[i], this.materials.sand);
            }
            for(let i = 0; i < 19; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[1][i], this.floor_y + 2.5, this.layers_z[1][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            for (let i = 0; i < 14; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[2][i], this.floor_y + 5, this.layers_z[2][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            for (let i = 0; i < 15; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[3][i], this.floor_y + 7.5, this.layers_z[3][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            for (let i = 0; i < 48; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[4][i], 17, this.layers_z[4][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }

            for(let i = 0; i < 16; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[5][i], 19, this.layers_z[5][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            for(let i = 0; i < 8; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[6][i], 21, this.layers_z[6][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            let temp_trans1 = Mat4.identity().times(Mat4.translation(this.layers_x[7][0], 23, this.layers_z[7][0]));
            this.shapes.cube.draw(context, program_state, temp_trans1, this.materials.sand);
        }
        if(this.layer == 4){
            let temp = 0;
            if(this.floor_y < 1){
                temp = 1;
            }
            else{
                temp = this.floor_y;
            }
            for (let i = 0; i < 47; i++) {
                this.house_floor_transform[i] = Mat4.identity().times(Mat4.translation(this.layers_x[0][i], temp, this.layers_z[0][i], 0));
                this.shapes.cube.draw(context, program_state, this.house_floor_transform[i], this.materials.sand);
            }
            for(let i = 0; i < 19; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[1][i], this.floor_y + 2.5, this.layers_z[1][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            for (let i = 0; i < 14; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[2][i], this.floor_y + 5, this.layers_z[2][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            for (let i = 0; i < 15; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[3][i], this.floor_y + 7.5, this.layers_z[3][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            for (let i = 0; i < 48; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[4][i], this.floor_y + 10, this.layers_z[4][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            for(let i = 0; i < 16; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[5][i], 19, this.layers_z[5][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            for(let i = 0; i < 8; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[6][i], 21, this.layers_z[6][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            let temp_trans1 = Mat4.identity().times(Mat4.translation(this.layers_x[7][0], 23, this.layers_z[7][0]));
            this.shapes.cube.draw(context, program_state, temp_trans1, this.materials.sand);
        }
        if(this.layer == 5){
            let temp = 0;
            if(this.floor_y < 1){
                temp = 1;
            }
            else{
                temp = this.floor_y;
            }
            for (let i = 0; i < 47; i++) {
                this.house_floor_transform[i] = Mat4.identity().times(Mat4.translation(this.layers_x[0][i], temp, this.layers_z[0][i], 0));
                this.shapes.cube.draw(context, program_state, this.house_floor_transform[i], this.materials.sand);
            }
            if(this.floor_y + 2.5 < 3){
                temp = 3;
            }
            else{
                temp = this.floor_y + 2.5;
            }
            for(let i = 0; i < 19; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[1][i], temp, this.layers_z[1][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            for (let i = 0; i < 14; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[2][i], this.floor_y + 5, this.layers_z[2][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            for (let i = 0; i < 15; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[3][i], this.floor_y + 7.5, this.layers_z[3][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            for (let i = 0; i < 48; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[4][i], this.floor_y + 10, this.layers_z[4][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            for(let i = 0; i < 16; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[5][i], this.floor_y+12.5, this.layers_z[5][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            for(let i = 0; i < 8; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[6][i], 21, this.layers_z[6][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            let temp_trans1 = Mat4.identity().times(Mat4.translation(this.layers_x[7][0], 23, this.layers_z[7][0]));
            this.shapes.cube.draw(context, program_state, temp_trans1, this.materials.sand);
        }
        if(this.layer == 6) {
            let temp = 0;
            if(this.floor_y < 1){
                temp = 1;
            }
            else{
                temp = this.floor_y;
            }
            for (let i = 0; i < 47; i++) {
                this.house_floor_transform[i] = Mat4.identity().times(Mat4.translation(this.layers_x[0][i], temp, this.layers_z[0][i], 0));
                this.shapes.cube.draw(context, program_state, this.house_floor_transform[i], this.materials.sand);
            }
            if(this.floor_y + 2.5 < 3){
                temp = 3;
            }
            else{
                temp = this.floor_y + 2.5;
            }
            for (let i = 0; i < 19; i++) {
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[1][i], temp, this.layers_z[1][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            if(this.floor_y + 5 < 5){
                temp = 5;
            }
            else{
                temp = this.floor_y + 5;
            }
            for (let i = 0; i < 14; i++) {
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[2][i], temp, this.layers_z[2][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            for (let i = 0; i < 15; i++) {
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[3][i], this.floor_y + 7.5, this.layers_z[3][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            for (let i = 0; i < 48; i++) {
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[4][i], this.floor_y + 10, this.layers_z[4][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            for (let i = 0; i < 16; i++) {
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[5][i], this.floor_y+12.5, this.layers_z[5][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            for (let i = 0; i < 8; i++) {
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[6][i], this.floor_y+15, this.layers_z[6][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            let temp_trans1 = Mat4.identity().times(Mat4.translation(this.layers_x[7][0], 23, this.layers_z[7][0]));
            this.shapes.cube.draw(context, program_state, temp_trans1, this.materials.sand);
        }
        if(this.layer == 7){
            let temp = 0;
            if(this.floor_y < 1){
                temp = 1;
            }
            else{
                temp = this.floor_y;
            }
            for (let i = 0; i < 47; i++) {
                this.house_floor_transform[i] = Mat4.identity().times(Mat4.translation(this.layers_x[0][i], temp, this.layers_z[0][i], 0));
                this.shapes.cube.draw(context, program_state, this.house_floor_transform[i], this.materials.sand);
            }
            if(this.floor_y + 2.5 < 3){
                temp = 3;
            }
            else{
                temp = this.floor_y + 2.5;
            }
            for(let i = 0; i < 19; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[1][i], temp, this.layers_z[1][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            if(this.floor_y + 5 < 5){
                temp = 5;
            }
            else{
                temp = this.floor_y + 5;
            }
            for (let i = 0; i < 14; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[2][i], temp, this.layers_z[2][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            if(this.floor_y + 7.5 < 7){
                temp = 7;
            }
            else{
                temp = this.floor_y + 7.5;
            }
            for (let i = 0; i < 15; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[3][i], temp, this.layers_z[3][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            if(this.floor_y + 10 < 1){
                temp = 1;
            }
            else{
                temp = this.floor_y + 10;
            }
            for (let i = 0; i < 48; i++){
                if(i < 25){
                    if(this.floor_y + 10 < 9){
                        temp = 9;
                    }
                    else{
                        temp = this.floor_y + 10;
                    }
                }
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[4][i], temp, this.layers_z[4][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            if(this.floor_y + 12.5 < 3){
                temp = 3;
            }
            else{
                temp = this.floor_y + 12.5;
            }
            for(let i = 0; i < 16; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[5][i], temp, this.layers_z[5][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            if(this.floor_y + 15 < 5){
                temp = 5;
            }
            else{
                temp = this.floor_y + 15;
            }
            for(let i = 0; i < 8; i++) {
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[6][i], temp, this.layers_z[6][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            if(this.floor_y + 17.5 < 7){
                temp = 7;
            }
            else{
                temp = this.floor_y + 17.5;
            }
            let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[7][0], temp, this.layers_z[7][0]));
            this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
        }



    }


    tree_drawer(x, z, context, program_state){
        let tree_transform = Mat4.identity();
        tree_transform = tree_transform.times(Mat4.translation(x,1,z));
        this.shapes.cube.draw(context,program_state, tree_transform, this.materials.tree);
        tree_transform = tree_transform.times(Mat4.translation(0,2,0));
        this.shapes.cube.draw(context,program_state, tree_transform, this.materials.tree);
        tree_transform = tree_transform.times(Mat4.translation(0,2,0));
        this.shapes.cube.draw(context,program_state, tree_transform, this.materials.tree);
        tree_transform = tree_transform.times(Mat4.translation(0,2,0));
        this.shapes.cube.draw(context,program_state, tree_transform, this.materials.tree); //drawn at y = 7
        tree_transform = tree_transform.times(Mat4.translation(0,2,0));
        this.shapes.cube.draw(context,program_state, tree_transform, this.materials.leaf);
        tree_transform = tree_transform.times(Mat4.translation(0,2,0));
        this.shapes.cube.draw(context,program_state, tree_transform, this.materials.leaf);
        tree_transform = tree_transform.times(Mat4.translation(0,2,0));
        this.shapes.cube.draw(context,program_state, tree_transform, this.materials.leaf);
        let temp_trans = Mat4.identity().times(Mat4.translation(x,9,z)).times(Mat4.translation(2,0,0));
        this.shapes.cube.draw(context,program_state, temp_trans, this.materials.leaf);
        temp_trans = Mat4.identity().times(Mat4.translation(x,9,z)).times(Mat4.translation(4,0,0));
        this.shapes.cube.draw(context,program_state, temp_trans, this.materials.leaf);
        temp_trans = Mat4.identity().times(Mat4.translation(x,9,z)).times(Mat4.translation(-2,0,0));
        this.shapes.cube.draw(context,program_state, temp_trans, this.materials.leaf);
        temp_trans = Mat4.identity().times(Mat4.translation(x,9,z)).times(Mat4.translation(-4,0,0));
        this.shapes.cube.draw(context,program_state, temp_trans, this.materials.leaf);
        temp_trans = Mat4.identity().times(Mat4.translation(x,9,z)).times(Mat4.translation(0,0,2));
        this.shapes.cube.draw(context,program_state, temp_trans, this.materials.leaf);
        temp_trans = Mat4.identity().times(Mat4.translation(x,9,z)).times(Mat4.translation(0,0,4));
        this.shapes.cube.draw(context,program_state, temp_trans, this.materials.leaf);
        temp_trans = Mat4.identity().times(Mat4.translation(x,9,z)).times(Mat4.translation(0,0,-2));
        this.shapes.cube.draw(context,program_state, temp_trans, this.materials.leaf);
        temp_trans = Mat4.identity().times(Mat4.translation(x,9,z)).times(Mat4.translation(0,0,-4));
        this.shapes.cube.draw(context,program_state, temp_trans, this.materials.leaf);
        temp_trans = Mat4.identity().times(Mat4.translation(x,9,z)).times(Mat4.translation(-2,0,-2));
        this.shapes.cube.draw(context,program_state, temp_trans, this.materials.leaf);
        temp_trans = Mat4.identity().times(Mat4.translation(x,9,z)).times(Mat4.translation(2,0,-2));
        this.shapes.cube.draw(context,program_state, temp_trans, this.materials.leaf);
        temp_trans = Mat4.identity().times(Mat4.translation(x,9,z)).times(Mat4.translation(2,0,2));
        this.shapes.cube.draw(context,program_state, temp_trans, this.materials.leaf);
        temp_trans = Mat4.identity().times(Mat4.translation(x,9,z)).times(Mat4.translation(-2,0,2));
        this.shapes.cube.draw(context,program_state, temp_trans, this.materials.leaf);
        temp_trans = Mat4.identity().times(Mat4.translation(x,9,z)).times(Mat4.translation(-2,2,-2));
        this.shapes.cube.draw(context,program_state, temp_trans, this.materials.leaf);
        temp_trans = Mat4.identity().times(Mat4.translation(x,9,z)).times(Mat4.translation(2,2,-2));
        this.shapes.cube.draw(context,program_state, temp_trans, this.materials.leaf);
        temp_trans = Mat4.identity().times(Mat4.translation(x,9,z)).times(Mat4.translation(2,2,2));
        this.shapes.cube.draw(context,program_state, temp_trans, this.materials.leaf);
        temp_trans = Mat4.identity().times(Mat4.translation(x,9,z)).times(Mat4.translation(-2,2,2));
        this.shapes.cube.draw(context,program_state, temp_trans, this.materials.leaf);

        temp_trans = Mat4.identity().times(Mat4.translation(x,9,z)).times(Mat4.translation(2,-2,-2));
        this.shapes.cube.draw(context,program_state, temp_trans, this.materials.leaf);
        temp_trans = Mat4.identity().times(Mat4.translation(x,9,z)).times(Mat4.translation(2,-2,2));
        this.shapes.cube.draw(context,program_state, temp_trans, this.materials.leaf);
        temp_trans = Mat4.identity().times(Mat4.translation(x,9,z)).times(Mat4.translation(-2,-2,2));
        this.shapes.cube.draw(context,program_state, temp_trans, this.materials.leaf);
        temp_trans = Mat4.identity().times(Mat4.translation(x,9,z)).times(Mat4.translation(-2,-2,-2));
        this.shapes.cube.draw(context,program_state, temp_trans, this.materials.leaf);
        temp_trans = Mat4.identity().times(Mat4.translation(x,9,z)).times(Mat4.translation(2,-2,0));
        this.shapes.cube.draw(context,program_state, temp_trans, this.materials.leaf);
        temp_trans = Mat4.identity().times(Mat4.translation(x,9,z)).times(Mat4.translation(-2,-2,0));
        this.shapes.cube.draw(context,program_state, temp_trans, this.materials.leaf);
        temp_trans = Mat4.identity().times(Mat4.translation(x,9,z)).times(Mat4.translation(0,-2,2));
        this.shapes.cube.draw(context,program_state, temp_trans, this.materials.leaf);
        temp_trans = Mat4.identity().times(Mat4.translation(x,9,z)).times(Mat4.translation(0,-2,-2));
        this.shapes.cube.draw(context,program_state, temp_trans, this.materials.leaf);

    }

    display(context, program_state) {
        if (!context.scratchpad.controls) {
            this.children.push(context.scratchpad.controls = new defs.Movement_Controls());
            // Define the global camera and projection matrices, which are stored in program_state.
            program_state.set_camera(Mat4.translation(0, -15, -80));
        }
        program_state.projection_transform = Mat4.perspective(
            Math.PI / 4, context.width / context.height, 1, 300);

        // *** Lights: *** Values of vector or point lights.


        const t = program_state.animation_time / 1000, dt = program_state.animation_delta_time / 1000;
        const light_position = vec4(0, 50, 0, 1);
        program_state.lights = [new Light(light_position, color(1, 1, 1, 1), 1000)];

        let sun_model_transform = Mat4.identity();
        sun_model_transform = sun_model_transform.times(Mat4.scale(10,10,10)).times(Mat4.rotation(t*Math.PI/35, 0,1,1)).times(Mat4.translation(10,0,0));
        this.shapes.sun.draw(context, program_state, sun_model_transform, this.materials.sun_material);


        let pillar_transform = [Mat4.identity().times(Mat4.translation(-6, 0, 0, 0)),
                                Mat4.identity().times(Mat4.translation(6, 0, 0, 0)),
                                Mat4.identity().times(Mat4.translation(-6, 0, -12, 0)),
                                Mat4.identity().times(Mat4.translation(6, 0, -12, 0))]

        //This si for drawing the pillars
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

        //This is for drawing the brick / wooden house
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

                if (Math.floor(t) > 9.0)
                {
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, 9, -10, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, 9, -10, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, 9, -10, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, 9, -10, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, 9, -10, 0)));
                    for (let i = 24; i < 29; i++)
                        this.shapes.cube.draw(context, program_state, house_floor_transform[i], this.materials.stone);
                }
                if (Math.floor(t) > 10.0)
                {
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, 9, -8, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, 9, -8, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, 9, -8, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, 9, -8, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, 9, -8, 0)));
                    for (let i = 29; i < 34; i++)
                        this.shapes.cube.draw(context, program_state, house_floor_transform[i], this.materials.stone);
                }

                if (Math.floor(t) > 11.0)
                {
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, 9, -6, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, 9, -6, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, 9, -6, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, 9, -6, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, 9, -6, 0)));
                    for (let i = 34; i < 39; i++)
                        this.shapes.cube.draw(context, program_state, house_floor_transform[i], this.materials.stone);
                }

                if (Math.floor(t) > 12.0)
                {
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(-4, 9, -4, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(4, 9, -4, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(-2, 9, -4, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(2, 9, -4, 0)));
                    house_floor_transform.push(Mat4.identity().times(Mat4.translation(0, 9, -4, 0)));
                    for (let i = 39; i < 44; i++)
                        this.shapes.cube.draw(context, program_state, house_floor_transform[i], this.materials.stone);
                }

                if (Math.floor(t) > 13.0)
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

            if (Math.floor(t) > 14.0)
            {
                let house_wall_transform = [Mat4.identity().times(Mat4.translation(-6, 11, 0, 0)),
                                            Mat4.identity().times(Mat4.translation(6, 11, 0, 0)),
                                            Mat4.identity().times(Mat4.translation(-6, 11, -12, 0)),
                                            Mat4.identity().times(Mat4.translation(6, 11, -12, 0)),]

                for (let i = 0; i < 4; i++)
                    this.shapes.cube.draw(context, program_state, house_wall_transform[i], this.materials.stonebrick);

                if (Math.floor(t) > 15.0)
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

                if (Math.floor(t) > 16.0)
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
                if (Math.floor(t) > 17.0)
                {
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(0, 11, -12, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, 11, -6, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, 11, -6, 0)));
                    for (let i = 20; i < 23; i++)
                        this.shapes.cube.draw(context, program_state, house_wall_transform[i], this.materials.stonebrick);
                }

                let y_wall = 13;
                if (Math.floor(t) > 18.0)
                {
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, 0, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, 0, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -12, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -12, 0)));
                    for (let i = 23; i < 27; i++)
                        this.shapes.cube.draw(context, program_state, house_wall_transform[i], this.materials.stonebrick);
                }
                if (Math.floor(t) > 19.0)
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
                if (Math.floor(t) > 20.0)
                {
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(-2, y_wall, 0, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(2, y_wall, 0, 0)));

                    for (let i = 35; i < 37; i++)
                        this.shapes.cube.draw(context, program_state, house_wall_transform[i], this.materials.stonebrick);
                }
                if (Math.floor(t) > 21.0)
                {
                    y_wall = y_wall + 2;

                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, 0, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, 0, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -12, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -12, 0)));
                    for (let i = 37; i < 41; i++)
                        this.shapes.cube.draw(context, program_state, house_wall_transform[i], this.materials.stonebrick);
                }
                if (Math.floor(t) > 22.0)
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
                if (Math.floor(t) > 23.0)
                {
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(-2, y_wall, 0, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(2, y_wall, 0, 0)));

                    for (let i = 49; i < 51; i++)
                        this.shapes.cube.draw(context, program_state, house_wall_transform[i], this.materials.stonebrick);
                }
                if (Math.floor(t) > 24.0)
                {
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(0, y_wall, 0, 0)));
                    this.shapes.cube.draw(context, program_state, house_wall_transform[51], this.materials.stonebrick);
                }
                if (Math.floor(t) > 25.0)
                {
                    y_wall = y_wall + 2;

                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, 0, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, 0, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -12, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -12, 0)));
                    for (let i = 52; i < 56; i++)
                        this.shapes.cube.draw(context, program_state, house_wall_transform[i], this.materials.stonebrick);
                }
                if (Math.floor(t) > 26.0)
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
                if (Math.floor(t) > 27.0)
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
                if (Math.floor(t) > 28.0)
                {

                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(0, y_wall, 0, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(0, y_wall, -12, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(-6, y_wall, -6, 0)));
                    house_wall_transform.push(Mat4.identity().times(Mat4.translation(6, y_wall, -6, 0)));
                    for (let i = 72; i < 76; i++)
                        this.shapes.cube.draw(context, program_state, house_wall_transform[i], this.materials.stonebrick);
                }

            }
            if (Math.floor(t) > 29.0)
            {
                let y_roof = 19;
                let house_roof_transform = [Mat4.identity().times(Mat4.translation(-4, y_roof, -2, 0)),
                                            Mat4.identity().times(Mat4.translation(4, y_roof, -2, 0)),
                                            Mat4.identity().times(Mat4.translation(-4, y_roof, -10, 0)),
                                            Mat4.identity().times(Mat4.translation(4, y_roof, -10, 0)),]

                for (let i = 0; i < 4; i++)
                    this.shapes.cube.draw(context, program_state, house_roof_transform[i], this.materials.redbrick);


                if (Math.floor(t) > 30.0)
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
                if (Math.floor(t) > 31.0)
                {
                    house_roof_transform.push(Mat4.identity().times(Mat4.translation(0, y_roof, -2, 0)));
                    house_roof_transform.push(Mat4.identity().times(Mat4.translation(0, y_roof, -10, 0)));
                    house_roof_transform.push(Mat4.identity().times(Mat4.translation(-4, y_roof, -6, 0)));
                    house_roof_transform.push(Mat4.identity().times(Mat4.translation(4, y_roof, -6, 0)));

                    for (let i = 12; i < 16; i++)
                        this.shapes.cube.draw(context, program_state, house_roof_transform[i], this.materials.redbrick);
                }
                if (Math.floor(t) > 32.0)
                {
                    y_roof = y_roof + 2;
                    house_roof_transform.push(Mat4.identity().times(Mat4.translation(-2, y_roof, -4, 0)));
                    house_roof_transform.push(Mat4.identity().times(Mat4.translation(2, y_roof, -4, 0)));
                    house_roof_transform.push(Mat4.identity().times(Mat4.translation(-2, y_roof, -8, 0)));
                    house_roof_transform.push(Mat4.identity().times(Mat4.translation(2, y_roof, -8, 0)));

                    for (let i = 16; i < 20; i++)
                        this.shapes.cube.draw(context, program_state, house_roof_transform[i], this.materials.redbrick);
                }

                if (Math.floor(t) > 33.0)
                {
                    house_roof_transform.push(Mat4.identity().times(Mat4.translation(0, y_roof, -4, 0)));
                    house_roof_transform.push(Mat4.identity().times(Mat4.translation(0, y_roof, -8, 0)));
                    house_roof_transform.push(Mat4.identity().times(Mat4.translation(2, y_roof, -6, 0)));
                    house_roof_transform.push(Mat4.identity().times(Mat4.translation(-2, y_roof, -6, 0)));

                    for (let i = 20; i < 24; i++)
                        this.shapes.cube.draw(context, program_state, house_roof_transform[i], this.materials.redbrick);
                }
                if (Math.floor(t) > 34.0)
                {
                    y_roof = y_roof + 2;
                    house_roof_transform.push(Mat4.identity().times(Mat4.translation(0, y_roof, -6, 0)));
                    this.shapes.cube.draw(context, program_state, house_roof_transform[24], this.materials.redbrick);
                }
            }

        }


        //This is for drawing the sand house
        if (this.sand_house && !this.fall)
        {

            for (let i = 0; i < 47; i++) { //maybe 49
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[0][i], 9, this.layers_z[0][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }

            for(let i = 0; i < 19; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[1][i], 11, this.layers_z[1][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            for (let i = 0; i < 14; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[2][i], 13, this.layers_z[2][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            for (let i = 0; i < 15; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[3][i], 15, this.layers_z[3][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            for (let i = 0; i < 48; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[4][i], 17, this.layers_z[4][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }

            for(let i = 0; i < 16; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[5][i], 19, this.layers_z[5][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }
            for(let i = 0; i < 8; i++){
                let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[6][i], 21, this.layers_z[6][i]));
                this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);
            }

            let temp_trans = Mat4.identity().times(Mat4.translation(this.layers_x[7][0], 23, this.layers_z[7][0]));
            this.shapes.cube.draw(context, program_state, temp_trans, this.materials.sand);


            if(!this.pillar_exist){
                this.fall = true;
            }


        }



        //this is for making the sand house fall
        if (this.fall)
        {
            this.sand_falling_transformation(context,program_state);

            this.floor_y = this.floor_y-0.1;


            if(this.counter > 4){
                if(this.layer < 7){
                    this.layer = this.layer + 1;
                }
                this.counter = 0;
            }
            this.counter = this.counter + 1;


        }


        let floor_transformation = Mat4.identity();
        floor_transformation = floor_transformation.times(Mat4.rotation(Math.PI/2,1,0,0)).times(Mat4.scale(100,100,1));
        this.shapes.floor.arrays.texture_coord.forEach(
            (v,i,l) => l[i] = vec(v[0],v[1]).times(100)
        )

        this.shapes.floor.draw(context, program_state, floor_transformation, this.materials.grass_jpg);

        let sky_transform = Mat4.identity();
        sky_transform = sky_transform.times(Mat4.translation(0,10,0)).times(Mat4.scale(100,100,100));
        this.shapes.sky_sphere.draw(context,program_state,sky_transform,this.materials.sky_png);


        this.tree_drawer(40,-10, context,program_state);
        this.tree_drawer(-40,-10, context,program_state);
        this.tree_drawer(0,-40, context,program_state);
        this.tree_drawer(20,-35,context,program_state);
        this.tree_drawer(-20,-35, context,program_state);
        this.tree_drawer(-23,-5, context,program_state);





    }
}


