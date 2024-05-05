const staff = require('../models/staff');
const mongoose = require('mongoose');

/**
* GET/
* Homepage 
*/

exports.homepage = async (req, res) => {
    // Remove
    // const messages = await req.consumeFlash('info');
    // Use this instead
    const messages = await req.flash("info");
  
    const locals = {
      title: " Student Database",
      description: "Student Management System",
    };
  
    let perPage = 12;
    let page = req.query.page || 1;
  
    try {
      const customers = await staff.aggregate([{ $sort: { createdAt: -1 } }])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();
      // Count is deprecated. Use countDocuments({}) or estimatedDocumentCount()
      // const count = await Customer.count();

      const count = await staff.countDocuments({});
  
      res.render("index_staff", {
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


exports.addCustomer = async(req,res)=>{

    const locals = {
        title: 'add New Staff',
        description : "Management System"
    }

    res.render('staff/add' , locals);
}



exports.postCustomer = async(req,res)=>{

    console.log(req.body)

    const newStaff = new staff({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        id : req.body.id,
        umur : req.body.umur,
        alamat: req.body.alamat,
        tempat_tanggal_lahir: req.body.tempat_tanggal_lahir,
        tel : req.body.tel,
        email: req.body.email,
        job : req.body.job,
        createAt : req.body.createAt,
        updateAt : req.body.updateAt

    })

    

    try {
        await staff.create(newStaff);
        await req.flash('info' , 'New Staff has been added')
        res.redirect('/staff');

    } catch (error) {
        console.log(error)
        
    }

    
}

exports.view = async(req,res)=>{

    try{
        const stafff = await staff.findOne({_id:req.params.id})

        const locals = {
            title: 'views',
            description : "Management System"
        };

        res.render('staff/view', {
            locals,
            stafff
        })


    }catch(error){
        console.log(error)
    }


}


exports.edit = async(req,res)=>{

    try{
        const stafff = await staff.findOne({_id:req.params.id})

        const locals = {
            title: 'edits',
            description : "Management System"
        };

        res.render('staff/edit', {
            locals,
            stafff
        })


    }catch(error){
        console.log(error)
    }


}


exports.editPost = async(req,res)=>{

    try {
        await staff.findByIdAndUpdate(req.params.id , {
          first_name:req.body.first_name,
          last_name:req.body.last_name,
          id : req.body.id,
          umur : req.body.umur,
          alamat: req.body.alamat,
          tempat_tanggal_lahir: req.body.tempat_tanggal_lahir,
          tel : req.body.tel,
          email: req.body.email,
          job : req.body.job,
          updateAt : req.body.updateAt
          

        });

        await res.redirect(`/staff/edit/${req.params.id}`);

    } catch (error) {
        console.log(error)
    }

}




exports.deleteCustomer = async (req, res) => {
    try {
      await staff.deleteOne({ _id: req.params.id });
      res.redirect("/staff");
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
