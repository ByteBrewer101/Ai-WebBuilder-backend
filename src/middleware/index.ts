import { Request, Response, NextFunction } from "express";
import { userModel } from "../db";
import { clerkClient } from "@clerk/express";

interface AuthRequest extends Request {
  body: {
    userId?: string;
  };
}

export async function dbMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

   
    let user = await userModel.findOne({ userId });

    if (!user) {
 
      const clerkUser = await clerkClient.users.getUser(userId);
      if (!clerkUser) {
        return res.status(404).json({ error: "User not found in Clerk" });
      }

    
      user = await userModel.create({
        userId,
        attemptsLeft: 6,
        date: new Date(),
      });
      return next(); 
    }

 
    const currentDate = new Date();
    const lastAttemptDate = user.date;

    if (
      lastAttemptDate.getDate() === currentDate.getDate() &&
      lastAttemptDate.getMonth() === currentDate.getMonth() &&
      lastAttemptDate.getFullYear() === currentDate.getFullYear()
    ) {

      if (user.attemptsLeft > 0) {
        user.attemptsLeft -= 1;
        await user.save();
        return next(); // Allow the request
      } else {
        return res
          .status(429)
          .json({ error: "Daily attempt limit reached. Try again tomorrow." });
      }
    } else {
      
      user.attemptsLeft = 6;
      user.date = currentDate;
      await user.save();
      return next();
    }
  } catch (error) {
    console.error("Database middleware error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}


// import { Request, Response, NextFunction } from "express";
// import { clerkClient } from "@clerk/express";

// interface AuthRequest extends Request {
//   body: {
//     userId?: string;
//   };
// }

// export async function clerkMiddleware(
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const { userId } = req.body;

//     if (!userId) {
//       return res.status(400).json({ error: "User ID is required" });
//     }

//     const clerkUser = await clerkClient.users.getUser(userId);

//     if (!clerkUser) {
//       return res.status(404).json({ error: "User not found in Clerk" });
//     }

//     // User exists → allow request
//     next();
//   } catch (error) {
//     console.error("Clerk middleware error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }

