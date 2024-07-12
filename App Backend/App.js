// npx nodemon app

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const jwtSecret = "aasjldjdspu29073ekjwhd2u8-u[uuwpiqwhdhuoy1028dhw";
const mongoUrl = "mongodb+srv://vipulpatil:e1UzKh7o5ewlOQ7U@cluster0.drh80rq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoUrl).then(() => {
    console.log("Database Connected");
}).catch((err) => {
    console.log("error", err);
});

require('./UseDetails');
const User = mongoose.model("UserInfo");

require('./Schema/Outlets');
const OutletInfo = mongoose.model("OutletInfo");

app.get("/", (req, res) => {
    res.send({ status: "started" });
});

// ----------------------------- register ----------------------------- //
app.post("/register", async (req, res) => {
    const { name, contactinfo, password, role } = req.body;

    if (!name || !contactinfo || !password || !role) {
        return res.status(400).send({ status: "error", data: "All fields are required" });
    }

    try {

        // Check if user with the same contactinfo and role already exists
        const oldUser = await User.findOne({ contactinfo: contactinfo, role: role });
        if (oldUser) {
            return res.status(400).send({ status: "error", data: "User with this contact info and role already exists" });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name: name,
            contactinfo: contactinfo,
            password: encryptedPassword,
            role: role
        });

        await user.save();

        res.status(201).send({ status: "ok", data: "User Created" });

    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).send({ status: "error", data: "Duplicate key error: contact info and role already exist" });
        }
        res.status(500).send({ status: "error", data: "Internal server error" });
    }
});

// ----------------------------- login ----------------------------- //
app.post("/login", async (req, res) => {
    const { contactinfo, password, role } = req.body;
    if (!contactinfo || !password || !role) {
        return res.status(400).send({ status: "error", data: "Contact info, role and password are required" });
    }

    try {
        const oldUser = await User.findOne({ contactinfo: contactinfo });
        if (!oldUser) {
            return res.status(400).send({ status: "error", data: "User not exist" });
        }

        if (oldUser.role !== role) {
            return res.status(400).send({ status: "error", data: 'Incorrect role. The appropriate role is ${oldUser.role}' });
        }

        const isPasswordMatch = await bcrypt.compare(password, oldUser.password);
        if (isPasswordMatch) {
            const token = jwt.sign({ contactinfo: oldUser.contactinfo }, jwtSecret, { expiresIn: '1h' });
            res.status(200).send({ status: "ok", data: token });
        } else {
            res.status(400).send({ status: "error", data: "Invalid credentials" });
        }
    } catch (err) {
        console.log(err)
        res.status(500).send({ status: "error", data: "Internal server error" });
    }
});

// ----------------------------- user_getdata ----------------------------- //
app.post('/userdata', async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, jwtSecret);
        const usercontactinfo = user.contactinfo;

        User.findOne({ contactinfo: usercontactinfo }).then((data) => {
            return res.send({ status: "ok", data: data });
        })
    } catch (err) {
        res.status(500).send({ status: "error", data: "Internal server error" });
    }
})

// ----------------------------- outletseller ----------------------------- //
app.post('/addoutlet', async (req, res) => {
    const {
        name, shopkeeperName, upiId, featured, type, menuType, location, locationDetailed,
        rating, ratingCount, image, details, openingTime, closingTime, offDays, leaveDay, token
    } = req.body;

    if (!name || !location || !menuType || !token) {
        return res.status(400).send({ status: "error", data: "All fields are required" });
    }

    try {
        const user = jwt.verify(token, jwtSecret);

        const userId = user.contactinfo;

        // const oldoutlet = await OutletInfo.findOne({ userId: userId });
        // if (oldoutlet) {
        //     return res.status(400).send({ status: "error", data: "User with this contact info oldoutlet already exists" });
        // }


        const outlet = new OutletInfo({ //featured, rating, ratingCount,
            name, shopkeeperName, upiId, type, menuType, location, locationDetailed,
            image, details, openingTime, closingTime, offDays, leaveDay, userId
        });

        await outlet.save();

        res.status(201).send({ status: "ok", data: "Outlet Created" });

    } catch (err) {
        console.log(err)
        res.status(500).send({ status: "error", data: "Internal server error" });
    }
});

// ----------------------------- user outlets ----------------------------- //
app.post('/useroutlets', async (req, res) => {
    const { token } = req.body;

    try {
        const user = jwt.verify(token, jwtSecret);
        const usercontactinfo = user.contactinfo;

        const outlets = await OutletInfo.find({ userId: usercontactinfo });

        res.status(200).send({ status: "ok", data: outlets });

    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "error", data: "Internal server error" });
    }
});

app.listen(5001, () => {
    console.log("Server started on port 5001");
});