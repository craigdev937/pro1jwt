import express from "express";
import bcrypt from "bcryptjs";
import { dBase } from "../data/Database.ts";
import { signToken } from "../middleware/Auth.ts";
import { LSchema, RSchema } from "../validation/Schema.ts";
import type { RType } from "../validation/Schema.ts";
import type { IReg } from "../models/Interfaces.ts";

class UserClass {
    Register: express.Handler = async (req, res, next) => {
        try {
            const R = RSchema.parse(req.body);
            const eQRY = "SELECT email FROM users WHERE email=$1";
            const userExists = await dBase.query<RType>(eQRY, [R.email]);
            if (userExists.rows.length > 0) {
                return res.status(401)
                    .json({msg: "User Already Exists!"});
            };
            const bPASS = await bcrypt.hash(R.password, 10);
            const QRY = `INSERT INTO users 
                (first, last, email, password, image) 
                VALUES ($1, $2, $3, $4, $5) RETURNING *`;
            const values = [R.first, R.last, 
                R.email, bPASS, R.image];
            const newUser = await dBase.query<IReg>(QRY, values);
            const newToken = signToken(newUser.rows[0].id);
            res.cookie("token", newToken, {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24 * 30  // 30-Days.
            });
            return res
                .status(201)
                .json({
                    success: true,
                    message: "User has Registered!",
                    data: {
                        user: newUser.rows[0],
                        token: newToken
                    }
                });
        } catch (error) {
            res
                .status(res.statusCode)
                .json({
                    success: false,
                    message: "Error Registering the User!",
                    error: error instanceof Error ?
                        error.message : "Unknown Error!"
                });
            next(error);
        }
    };

    FetchAll: express.Handler = async (req, res, next) => {
        try {
            const QRY = "SELECT * FROM users ORDER BY id ASC";
            const users = await dBase.query<IReg[]>(QRY);
            return res
                .status(201)
                .json({
                    success: true,
                    message: "All Registered Users!",
                    count: users.rows.length,
                    data: users.rows
                });
        } catch (error) {
            res
                .status(res.statusCode)
                .json({
                    success: false,
                    message: "Error fetching all the Users!",
                    error: error instanceof Error ?
                        error.message : "Unknown Error!"
                });
            next(error);
        }
    };

    Login: express.Handler = async (req, res, next) => {
        try {
            const L = LSchema.parse(req.body);
            const QRY = "SELECT * FROM users WHERE email=$1";
            const user = await dBase.query<IReg>(QRY, [L.email]);
            if (user.rows.length === 0) {
                return res.status(401)
                    .json({msg: "Invalid Credentials!"});
            };

            const uData = user.rows[0];
            const isMatch = await bcrypt.compare(
                L.password, uData.password);
            if (!isMatch) {
                return res.status(401)
                    .json({msg: "Invalid Credentials!"});
            };

            const logToken = signToken(uData.id);
            res.cookie("token", logToken, {
                httpOnly: true,
                secure: false,  //  Set to True for Production.
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24 * 30  // 30-Days.
            });
            return res
                .status(201)
                .json({
                    success: true,
                    message: "The User has Logged In!",
                    data: {
                        id: uData.id,
                        first: uData.first,
                        last: uData.last,
                        email: uData.email,
                        createdAt: uData.created_at,
                        updatedAt: uData.updated_at
                    },
                    token: logToken
                });
        } catch (error) {
            res
                .status(res.statusCode)
                .json({
                    success: false,
                    message: "Error loggin in the User!",
                    error: error instanceof Error ?
                        error.message : "Unknown Error!"
                });
            next(error);
        }
    };

    Logout: express.Handler = async (req, res, next) => {
        try {
            res.cookie("token", "", {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                maxAge: 1
            });
            res
                .status(201)
                .json({
                    success: true,
                    message: "The User has Logged Out!"
                });
        } catch (error) {
            res
                .status(res.statusCode)
                .json({
                    success: false,
                    message: "Error logging out the User!",
                    error: error instanceof Error ?
                        error.message : "Unknown Error!"
                });
            next(error);
        }
    };

    Me: express.Handler = async (req, res, next) => {
        try {
            res.json({
                success: true,
                message: "User Profile Info!",
                data: req.user
            });
        } catch (error) {
            res
                .status(res.statusCode)
                .json({
                    success: false,
                    message: "Error finding User Profile!",
                    error: error instanceof Error ?
                        error.message : "Unknown Error!"
                });
            next(error);
        }
    };

    GetOne: express.Handler = async (req, res, next) => {
        try {
            const { id } = req.params;
            const QRY = "SELECT * FROM users WHERE id=$1";
            const values = [id];
            const user = await dBase.query<IReg>(QRY, values);
            return res
                .status(201)
                .json({
                    success: true,
                    message: "One User!",
                    data: user.rows[0]
                });
        } catch (error) {
            res
                .status(res.statusCode)
                .json({
                    success: false,
                    message: "Error Getting One User!",
                    error: error instanceof Error ?
                        error.message : "Unknown Error!"
                });
            next(error);
        }
    };

    Update: express.Handler = async (req, res, next) => {
        try {
            const R = RSchema.parse(req.body);
            const { id } = req.params;
            const QRY = `UPDATE users 
            SET first=$1, last=$2, email=$3, password=$4, image=$5,
            updated_at = CURRENT_TIMESTAMP 
            WHERE id=$6 RETURNING *`;
            const values = [R.first, R.last, R.email, 
                R.password, R.image, id];
            const user = await dBase.query<IReg>(QRY, values);
            return res
                .status(201)
                .json({
                    success: true,
                    message: "The User was Updated!",
                    data: user.rows[0]
                });
        } catch (error) {
            res
                .status(res.statusCode)
                .json({
                    success: false,
                    message: "Error Updating the User!",
                    error: error instanceof Error ?
                        error.message : "Unknown Error!"
                });
            next(error);
        }
    };

    Delete: express.Handler = async (req, res, next) => {
        try {
            const { id } = req.params;
            const QRY = "DELETE FROM users WHERE id=$1";
            const values = [id];
            const delUser = await dBase.query<IReg>(QRY, values);
            return res
                .status(201)
                .json({
                    success: true,
                    message: "The User was Deleted!",
                    data: delUser.rows[0]
                });
        } catch (error) {
            res
                .status(res.statusCode)
                .json({
                    success: false,
                    message: "Error Deleting the User!",
                    error: error instanceof Error ?
                        error.message : "Unknown Error!"
                });
            next(error);
        }
    };
};

export const USER: UserClass = new UserClass();







