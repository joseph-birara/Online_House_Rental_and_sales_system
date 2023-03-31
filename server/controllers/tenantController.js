const  mongoose  = require('mongoose')
const tenantModel = require('../models/tenantModel')
const login = require('../authController/login')
const {
  initiatePasswordReset,
  resetPassword 
}= require('../authController/passwordReset');
const { hashPassword } = require('../authController/passwordHash');
const getUser = require('../authController/authorize');
const { changePassword } = require('../authController/changePassword');

// tenant log in
const tenantLogin = async (req, res) => {
  await login(req, res, tenantModel)
}

// get all tenants
const getAllTenants = async (req, res) => {
  try {
    const tenants = await tenantModel.find({})
    // register image URLs to each tenant object
    const tenantsWithImages = tenants.map(tenant => {
      if (tenant.image) {
        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/tenant/${tenant.image}`
        tenant.image = imageUrl
      }
      return tenant
    })

    res.status(200).json(tenantsWithImages)
  } catch (err) {
    res.status(400).json({ error: err.message })        
  }
}


// get single tenant
const getTenant = async (req, res) => {
  const id = await getUser(req, res)

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such '})
  }

  const tenant = await tenantModel.findById(id)

  if (!tenant) {
    return res.status(404).json({error: 'No such tenant'})
  }

   res.status(200).json({
      id: tenant._id,
      name: tenant.name,
      lastName: tenant.lastName,
      phone: tenant.phone,
      email: tenant.email,
      image: tenant==""?"": `${req.protocol}://${req.get('host')}/uploads/tenant/${tenant.image}`,
    });
}


// register tenant

const registerTenant = async (req, res) => {
console.log('this is body', req.body.data)  
console.log("file", req.file)    
const data = JSON.parse(req.body.data);
const name = data.name;
const lastName = data.lastName;
const phone = data.phone;
const email = data.email;
const password = data.password;
const city = data.city;
const subCity = data.subCity;
const kebele = data.kebele;
const saleId = [];
const aplicantId = [];
const rentId = [];

const isTaken = await tenantModel.findOne({email})
  if (isTaken) {
   return res.status(401).json({error:"email is taken"})
  }

  
  console.log("body", password)
  if (req.file) {
    image = req.file.filename
  } else {
    image = ''
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  try {
    const tenant = await tenantModel.create({
    lastName,
    image,   
    
    name,
    email,    
    phone ,      
    password: hashedPassword,     
      phone,
      city,
      subCity,
      kebele,
      rentId,
      aplicantId,
    saleId
    });
    res.status(200).json(tenant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// delet tenant
const deleteTenant = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'invalid id'})
  }

  try {
    // Find tenant in database
    const tenant = await tenantModel.findById(id)

    if (!tenant) {
      return res.status(400).json({error: 'No such tenant'})
    }

    // Delete image from file system if it exists
    if (tenant.image) {
      const imagePath = path.join(__dirname, '../uploads/profile', tenant.image)
      fs.unlinkSync(imagePath)
    }

    // Delete tenant from database
    await tenantModel.findByIdAndDelete(id)

    res.status(200).json(tenant)
  } catch (err) {
    res.status(400).json({ error: err.message })        
  }
}


//update tenant

const updateTenant = async (req, res) => {
  const id = await getUser(req, res)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'invalid id'})
  }
    const tenant = await tenantModel.findOneAndUpdate({ _id: id }, {
      ...req.body
  })
  if (!tenant) {
    return res.status(400).json({error: 'No such tenant'})
  }
  res.status(200).json(tenant)
}

// change password 
const updatePassword = async (req, res) => {
  await changePassword(req,res, tenantModel)  
}


const passwordResetRequest = async (req, res) => {
  await initiatePasswordReset(req, res, tenantModel)
}
const resetPasswordProcess = async (req, res) => {
  await resetPassword(req, res, tenantModel)
}


module.exports = {
    registerTenant,
    getAllTenants,
    getTenant,
    deleteTenant,
   updateTenant,
  tenantLogin,
  passwordResetRequest,
  resetPasswordProcess,
  updatePassword
  
}
