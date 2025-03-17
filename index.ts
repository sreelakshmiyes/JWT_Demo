import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const app = express();
dotenv.config();
let PORT = process.env.PORT || 5000;
try {


    app.listen(PORT, () => {

        console.log("Server started on port " + PORT);
    });


} catch (error) {

    console.log("Some error when server started " + error);
}


app.post("/user/generateToken", (req: Request, res: Response) => {

    let jwtSecretKey = process.env.JWT_SECRET_KEY || "";
    let data = {
        time: Date(),
        userId: 15
    };

    const token = jwt.sign(data, jwtSecretKey);

    res.send(token);
});


app.get("/user/validateToken", (req: Request, res: any) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY || " ";
    const headerSecretKey = process.env.TOKEN_HEADER_KEY || " ";

    try {
        const token = req.get(headerSecretKey);
        if (token) {
            const userVerified = jwt.verify(token, jwtSecretKey);
            if (userVerified) {
                return res.status(200).send("Successfully verified");
            }
            else {
                return res.status(401).send("Something went wrong!!");
            }

        }
        else {
            return res.status(401).send("Something went wrong!!");
        }

    }
    catch (error) {
        return res.status(401).send(error);
    }
});
