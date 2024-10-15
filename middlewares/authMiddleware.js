import JWT from "jsonwebtoken";

export const requireSignin = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    req.user = decode;
    
    next();
  } catch (error) {
    console.error(error);
  }
};

//admin access
export const CheckAdmin = async (req, res, next) => {
  try {
   // const user = await userModel.findById(req.user._id);
    // const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
    if (req.user.isAdmin !== 1) {
      return res.status(401).send({ success:false, message:"⚠️UnAuthorized ‼️ this is an Admin resource.⛔ Access denied ❌" });
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    res.status(401).send({ success:false, error: `Middleware CheckAdmin Catch Err : ${error}` });
  }
};
