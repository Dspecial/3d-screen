/**
* @Author: lj
*/
const util = {
    /**
     * todo： 焊装
     */
    Welding:['Cube.8_2','Cube.2_1','Cube.12','Cube.11',
    'Cube.1_1','Cube.3_2','Cube.9','Cube.6','Cube.5','Cube.4'
    ,'Cube.7','Cube.36','Cube_1'],
    /**
     * todo ： 总装
     */
    FinalAssembly:['Cube.10_3','Cube.45','Cube.6_2','Cube.4_1','Cube.3_3',
    'Cube.43','Cube.44','Cube.46','Cube.47','Cube.7_2','Cube.5_1','Cube.2_2',
    'Cube.4_2','Cube.10_4','Cube.9_2','Cube_3','Cube.49','Cube.6_1','Cube_2',
    'Cube.5_2','Cube.11_2','Cube.2_3','Cube.12_2','Cube.3_4','Cube.7_1','Cube.11_1',
    'Cube.51','Cube.48','Cube.1_2','Cube.50','Cube.10_2','Cube.9_1','Cube.12_1'],
    /**
     * todo ：pack
     */
    Pack:['PACK'],
    OtherRoom:['立方体.1_1','Cube_1','Cube.8','Cube.10_1',
    'Cube.13_1','Cube.14_1','Cube.1','Cube','Cube.2','Cube.3_1',
    'Cube.8_1',' Cube.14','Cube.13','Cube.10','Cube.14'],
    /**
     * todo ：绿树
     */
    GRASSGREEN:['宝石_1','宝石.3_1','宝石.1_1','宝石_4','宝石_5','宝石_2','宝石.3_2',
    '宝石.2_2','宝石.1_2','宝石_6','宝石.3_6','宝石.2_6','宝石.1_6','宝石_3','宝石.3_3',
    '宝石.2_3','宝石.1_3','宝石','宝石.3_4','宝石.2_4','宝石.2_1','宝石.1_4','宝石.1_5',
    '宝石.2_5','宝石.3_5','宝石.3','宝石.2','宝石.1'],
    /**
     * 获取点数组不带最后重复点
     * param:[]
     */
    getlinePointArr: (param) => {
        let shapePoints = [];
        for (let i = 0; i < param.length - 1; i++) {
            // shapePoints.push(param[i][0].toFixed(2), param[i][1].toFixed(2));
            
            shapePoints.push(Math.floor(param[i][0] * 100) / 100, Math.floor(param[i][1] * 100) / 100);
        }
        return shapePoints;
        // param
    },
    /**
     * 生成随机颜色
     */
    getRandomColor:()=>{
       return 0xffffff * Math.random();
    },
}; export default util;