const Customer = require('../models/Customer');
const mongoose = require('mongoose');

/**
* GET/
* Homepage 
*/

exports.homepage = async (req, res) => {
    const messages = await req.flash("info");
    const locals = {
      title: " Student Database",
      description: "Student Management System",
    };
    let perPage = 12;
    let page = req.query.page || 1;
    try {
      const customers = await Customer.aggregate([{ $sort: { createdAt: -1 } }])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec() 
      const count = await Customer.countDocuments({});
      res.render("index", {
        locals,
        customers,
        current: page,
        pages: Math.ceil(count / perPage),
        messages,
      });
    } catch (error) {
      console.log(error);
    }
  };

  exports.about = async (req, res) => {
    const locals = {
      title: "About",
      description: "Free NodeJs User Management System",
    };
  
    try {
      res.render("about", locals);
    } catch (error) {
      console.log(error);
    }
  };











// exports.homepage = async(req,res)=>{

//     const messages = await req.flash("info");


    
//     const locals = {
//         title: 'NodeJs',
//         description : "Management System"
//     }

//     try {
//         const customers = await Customer.find({}).limit(22);
//         res.render('index' ,{ locals , messages , customers});

//     } catch (error) {
//         console.log(error)
//     }


// }

/**
* GET/
* add New Customer 
*/

exports.addCustomer = async(req,res)=>{
    const locals = {
        title: 'add New Student',
        description : "Management System"
    }
    res.render('customer/add' , locals);
}


/**
* POST/
* create new Customer 
*/

exports.postCustomer = async(req,res)=>{
    console.log(req.body)
    const newCustomer = new Customer({
        Name:req.body.Name,
        Nim:req.body.Nim,
        Fakultas : req.body.Fakultas,
        Jurusan : req.body.Jurusan,
        details: req.body.details,
        tel: req.body.tel,
        email: req.body.email,
        createAt : req.body.createAt,
        updateAt : req.body.updateAt
    })
    try {
        await Customer.create(newCustomer);
        await req.flash('info' , 'New customer has been added')
        res.redirect('/');

    } catch (error) {
        console.log(error)
    }
}

exports.view = async(req,res)=>{

    try{
        const customer = await Customer.findOne({_id:req.params.id})

        const locals = {
            title: 'views',
            description : "Management System"
        };

        res.render('customer/view', {
            locals,
            customer
        })


    }catch(error){
        console.log(error)
    }


}


exports.edit = async(req,res)=>{
    try{
        const customer = await Customer.findOne({_id:req.params.id})
        const locals = {
            title: 'edits',
            description : "Management System"
        };
        res.render('customer/edit', {
            locals,
            customer
        })
    }catch(error){
        console.log(error)
    }
}


exports.editPost = async(req,res)=>{

    try {
        await Customer.findByIdAndUpdate(req.params.id , {
          Name:req.body.Name,
          Nim:req.body.Nim,
          tel: req.body.tel,
          email: req.body.email,
          Fakultas : req.body.Fakultas,
          Jurusan : req.body.Jurusan,
          details: req.body.details,
          
          updateAt : Date.now()

        });

        await res.redirect(`/edit/${req.params.id}`);

    } catch (error) {
        console.log(error)
    }

}




exports.deleteCustomer = async (req, res) => {
    try {
      await Customer.deleteOne({ _id: req.params.id });
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
};

exports.searchCustomers = async (req, res) => {
    const locals = {
      title: "Search Customer Data",
      description: "Free NodeJs User Management System",
    };
  
    try {
      let searchTerm = req.body.searchTerm;
      const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
  
      const customers = await Customer.find({
        $or: [
          { Name: { $regex: new RegExp(searchNoSpecialChar, "i") } },
          { email: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        ],
      });
  
      res.render("search", {
        customers,
        locals,
      });
    } catch (error) {
      console.log(error);
    }
  };



