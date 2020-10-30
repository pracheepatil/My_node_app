module.exports = (sequelize, DataTypes) => {
const CollegeBranchMap = sequelize.define('collegeBranchMap', {
     id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false    
     }
   }, { 
     timestamps: false,
     uniqueKeys: {
      composite_unique: {
          fields: ['branchId', 'collegeId']
      }
  }
   });

    CollegeBranchMap.associate = (models) => {
      models.collegeBranchMap.belongsTo(models.college);
      models.collegeBranchMap.belongsTo(models.branch)
  }

  return CollegeBranchMap;
}

