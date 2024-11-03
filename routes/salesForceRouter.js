import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post("/createAccount", async (req, res) => {
  const { firstName, lastName, email } = req.body;

  try {
    const accountResponse = await axios.post(
      `${SALESFORCE_INSTANCE_URL}/services/data/${API_VERSION}/sobjects/Account`,
      { Name: `${firstName} ${lastName} Account` },
      {
        headers: {
          Authorization: `Bearer ${process.env.SALESFORCE_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const contactResponse = await axios.post(
      `${SALESFORCE_INSTANCE_URL}/services/data/${API_VERSION}/sobjects/Contact`,
      {
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        AccountId: accountResponse.data.id,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.SALESFORCE_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({ message: "Account and Contact created in Salesforce!" });
  } catch (error) {
    console.error("Error creating records in Salesforce:", error.response ? error.response.data : error.message);
    res.status(500).json({ message: "Failed to create records in Salesforce", error: error.response ? error.response.data : error.message });
  }
});

export default router;
