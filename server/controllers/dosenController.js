const Dosen = require('../models/dosen');
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
      const customers = await Dosen.aggregate([{ $sort: { createdAt: -1 } }])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();
      // Count is deprecated. Use countDocuments({}) or estimatedDocumentCount()
      // const count = await Customer.count();
      const count = await Dosen.countDocuments({});
  
      res.render("dosen_index", {
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
        title: 'add New Dosen',
        description : "Management System"
    }

    res.render('dosen/add' , locals);
}


exports.postCustomer = async(req,res)=>{

  console.log(req.body)

  const newdosen = new Dosen({
      Name:req.body.Name,
      ID : req.body.ID,
      Fakultas : req.body.Fakultas,
      Course : req.body.Course,
      tel : req.body.tel,
      email : req.body.email,
      last_educ : req.body.last_educ,
      createAt : req.body.createAt,
      updateAt : req.body.updateAt
  })

  

  try {

      await Dosen.create(newdosen);
      await req.flash('info' , 'New Professor has been added')
      res.redirect('/dosen');

  } catch (error) {
      console.log(error)
      
  }

  
}



exports.view = async(req,res)=>{

    try{
        const dosen = await Dosen.findOne({_id:req.params.id})

        const locals = {
            title: 'views',
            description : "Management System"
        };

        res.render('dosen/view', {
            locals,
            dosen
        })


    }catch(error){
        console.log(error)
    }


}


exports.edit = async(req,res)=>{

    try{
        const dosen = await Dosen.findOne({_id:req.params.id})

        const locals = {
            title: 'edits',
            description : "Management System"
        };

        res.render('dosen/edit', {
            locals,
            dosen
        })


    }catch(error){
        console.log(error)
    }


}


exports.editPost = async(req,res)=>{

    try {
        await Dosen.findByIdAndUpdate(req.params.id , {
          Name:req.body.Name,
          ID : req.body.ID,
          Fakultas : req.body.Fakultas,
          Course : req.body.Course,
          tel : req.body.tel,
          email : req.body.email,
          last_educ : req.body.last_educ,
          updateAt : Date.now()
        
        });

        await res.redirect(`/dosen/edit/${req.params.id}`);

    } catch (error) {
        console.log(error)
    }

}




exports.deleteCustomer = async (req, res) => {
    try {
      await Dosen.deleteOne({ _id: req.params.id });
      res.redirect("/dosen");
    } catch (error) {
      console.log(error);
    }
};


exports.searchCustomers = async (req, res) => {
    const locals = {
      title: "Search Professor Data",
      description: "Free NodeJs User Management System",
    };
  
    try {
      let searchTerm = req.body.searchTerm;
      const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
  
      const dosen = await Dosen.find({
        $or: [
          { Name: { $regex: new RegExp(searchNoSpecialChar, "i") } },
          { email: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        ],
      });
  
      res.render("dosen/search", {
        dosen,
        locals,
      });
    } catch (error) {
      console.log(error);
    }
  };
