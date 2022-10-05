import { NextApiRequest, NextApiResponse } from "next";
import { Admin } from "../../../src/models/Admin";
import dbConnect from "../../../src/util/dbConnect";
import { genSalt, hash } from "bcryptjs";

interface ResponseData {
  error: boolean;
  message: string;
}

dbConnect();

export default async function registerHandler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
): Promise<void> {
  if (req.method === "POST") {
    const { email, password } = req.body as { email: string; password: string };
    const existingEmail = await Admin.findOne({ email: email });
    if (existingEmail) {
      res.status(400).json({
        error: true,
        message: "Email already in use!",
      });
      return;
    }
    const admin = new Admin({
      email: email,
    });
    genSalt(process.env.SALT_ROUNDS, (saltError, salt) => {
      if (saltError) throw new Error(saltError.message);
      hash(password, salt, async (hashError, hash) => {
        if (hashError) throw new Error(hashError.message);
        try {
          admin.password = hash;
          await admin.save();
          res.status(200).json({
            error: false,
            message: "Admin profile created successfully!",
          });
        } catch (error: any) {
          res.status(400).json({
            error: true,
            message: `Failed to register admin due to the following error: ${error?.message}`,
          });
          throw new Error(error.message);
        }
      });
    });
  }
}
