import JWT from "jsonwebtoken";

// In your authMiddleware.js
export const requireSignin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log("Received token:", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    if (!token.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Token format invalid",
      });
    }

    const actualToken = token.split(" ")[1];

    /*
     const decode = JWT.verify(actualToken, process.env.JWT_SECRET);
req.user = {
    _id: decode.userId, // Assign userId to _id
    isAdmin: decode.isAdmin
};
    
    */
    const decode = JWT.verify(actualToken, process.env.JWT_SECRET);
    console.log("Decoded token:", decode); // Log the decoded token
    req.user = decode; // Ensure this includes the user ID

    console.log("Decoded token:", decode);
    req.user = { _id: decode._id, isAdmin: decode.isAdmin };

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired",
      });
    }
    res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
};

//admin access
export const CheckAdmin = async (req, res, next) => {
  try {
    // const user = await userModel.findById(req.user._id);
    // const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
    if (req.user.isAdmin !== 1) {
      return res
        .status(401)
        .send({
          success: false,
          message:
            "⚠️UnAuthorized ‼️ this is an Admin resource.⛔ Access denied ❌",
        });
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    res
      .status(401)
      .send({
        success: false,
        error: `Middleware CheckAdmin Catch Err : ${error}`,
      });
  }
};
