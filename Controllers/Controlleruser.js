import productModel from "../Models/Model.productModel.js";
import userModel from "../Models/Model.userModel.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
dotenv.config();

//sign up
export const signups = async (req, res) => {
  try {
    const { firstName, lastName, email, password, image } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    let newregistration = new userModel({
      firstName,
      lastName,
      email,
      password: hashPassword,
      image,
    });
    const getdata = await userModel.findOne({
      email: email,
    });
    if (getdata) {
      res.send({ message: "Email id is already register", alert: false });
    } else {
      await newregistration.save();
      res.send({ message: "Successfully sign up", alert: true });
    }
  } catch (error) {
    res.send({
      error: "Register failed , Registration internal error",
      alert: false,
    });
  }
};

// Login
export const logins = async (req, res) => {
  try {
    const { email, password } = req.body;
    const getdata = await userModel.findOne({
      email: email,
    });
    if (!getdata) {
      return res.json({ message: "user mail not found", alert: false });
    }

    const passwordMatch = await bcrypt.compare(password, getdata.password);
    if (!passwordMatch) {
      return res.json({ message: "Invalid user password", alert: false });
    }
    const dataSend = {
      _id: getdata._id,
      firstName: getdata.firstName,
      lastName: getdata.lastName,
      email: getdata.email,
      image: getdata.image,
    };
    const token = jwt.sign({ _id: getdata._id }, process.env.JWT_SECERT);
    res.send({
      message: "Login is successfully",
      alert: true,
      data: dataSend,
      token: token,
    });
  } catch (error) {
    res.json({ error: "Login failed , Login internal error", alert: false });
  }
};

//save product in data
//api
export const uploadProduct = async (req, res) => {
  try {
    const data = await productModel(req.body);
    const datasave = await data.save();
    res.json({ message: "Upload successfully", alert: true });
  } catch (error) {
    res.json({ error: "Login failed , Login internal error", alert: false });
  }
};

//getProduct
export const getProduct = async (req, res) => {
  try {
    const data = await productModel.find({});
    res.status(200).json(JSON.stringify(data));
  } catch (error) {
    res.json({ error: "Login failed , Login internal error", alert: false });
  }
};

/*****payment getWay */

// const stripe = new Stripe(process.env.JWT_SECERT);

// export const checkoutsession = async (req, res) => {
//   try {
//     const params = {
//       submit_type: "pay",
//       mode: "payment",
//       payment_method_types: ["card"],
//       billing_address_collection: "auto",
//       shipping_options: [{ shipping_rate: "shr_1N0qDnSAq8kJSdzMvlVkJdua" }],
//       line_items: req.body.map((item) => {
//         return {
//           price_data: {
//             currency: "inr",
//             product_data: {
//               name: item.name,
//               // images : [item.image]
//             },
//             unit_amount: item.price * 100,
//           },
//           adjustable_quantity: {
//             enabled: true,
//             minimum: 1,
//           },
//           quantity: item.qty,
//         };
//       }),
//       success_url: `${process.env.FRONTEND_URL}/success`,
//       cancel_url: `${process.env.FRONTEND_URL}/cancel`,
//     };
//     const session = await stripe.checkout.sessions.create(params);
//     // console.log(session)
//     res.status(200).json(session.id);
//   } catch (err) {
//     res.status(err.statusCode || 500).json(err.message);
//   }
// };

//   try {
//     const params = {
//       submit_type: "pay",
//       mode: "payment",
//       payment_method_types: ["card"],
//       billing_address_collection: "auto",
//       shipping_options: [{ shipping_rate: "shr_1N0qDnSAq8kJSdzMvlVkJdua" }],

//       line_items: req.body.map((item) => {
//         return {
//           price_data: {
//             currency: "inr",
//             product_data: {
//               name: item.name,
//               // images : [item.image]
//             },
//             unit_amount: item.price * 100,
//           },
//           adjustable_quantity: {
//             enabled: true,
//             minimum: 1,
//           },
//           quantity: item.qty,
//         };
//       }),

//       success_url: `${process.env.FRONTEND_URL}/success`,
//       cancel_url: `${process.env.FRONTEND_URL}/cancel`,
//     };

//     const session = await stripe.checkout.sessions.create(params);
//     // console.log(session)
//     res.status(200).json(session.id);
//   } catch (err) {
//     res.status(err.statusCode || 500).json(err.message);
//   }
// });
