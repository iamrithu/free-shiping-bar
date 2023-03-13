import { Shopify, ApiVersion } from "@shopify/shopify-api";
import express from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
import { uuid } from "uuidv4";

const prisma = new PrismaClient();

router.get("/shop", async (req, res) => {
  const test_session = await Shopify.Utils.loadCurrentSession(req, res, true);

  try {
    const data = await prisma.shops.findUnique({
      where: { name: test_session.shop },
    });
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
router.get("/shopUpdate", async (req, res) => {
  const test_session = await Shopify.Utils.loadCurrentSession(req, res, true);

  try {
    const data = await prisma.shops.update({
      where: { name: test_session.shop },
      data: { animate: false },
    });
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get("/announcementBar", async (req, res) => {
  const test_session = await Shopify.Utils.loadCurrentSession(req, res, true);

  try {
    const data = await prisma.shipbars.findMany({
      where: { shop: test_session.shop },
    });
    var demo = data.sort(function (a, b) {
      return a.id - b.id;
    });

    res.status(200).send(demo);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
router.get("/getUser/:id", async (req, res) => {
  try {
    const getUser = await prisma.shipbars.findUnique({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(201).send(getUser);
  } catch (error) {
    res.send(error.message);
  }
});
router.put("/updateUser/:id", async (req, res) => {
  try {
    var data = {
      name: req.body.name,
      content: req.body.shipBar,
      background: req.body.background,
      position: req.body.position,
      fontColor: req.body.fontColor,
      fontFamily: req.body.fontFamily,
      fontSize: req.body.fontSize,
      specialTextColor: req.body.specialTextColor,
      shipingGoal: req.body.shipingGoal,
      currency: req.body.currency,
      currencyPosition: req.body.currencyPosition,
      currencyContent: req.body.currencyContent,
      closeButton: req.body.closeButton,
    };
    let datas = await prisma.shipbars.update({
      where: { uuid: req.params.id },
      data,
    });
    res.send(datas);
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/announcementBar", async (req, res) => {
  const test_session = await Shopify.Utils.loadCurrentSession(req, res, true);

  try {
    var details = {
      uuid: uuid(),
      name: req.body.name,
      content: req.body.shipBar,
      background: req.body.background,
      position: req.body.position,
      fontColor: req.body.fontColor,
      fontFamily: req.body.fontFamily,
      fontSize: req.body.fontSize,
      specialTextColor: req.body.specialTextColor,
      shipingGoal: req.body.shipingGoal,
      currency: req.body.currency,
      currencyPosition: req.body.currencyPosition,
      currencyContent: req.body.currencyContent,
      closeButton: req.body.closeButton,
      shop: test_session.shop,
      isActive: "false",
    };
    let newData = await prisma.shipbars.create({
      data: details,
    });
    res.status(200).send(newData);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/update/:id", async (req, res) => {
  const test_session = await Shopify.Utils.loadCurrentSession(req, res);
  const data = await prisma.shipbars.findUnique({
    where: { uuid: req.params.id },
  });

  if (data.isActive === "true") {
    const data = await prisma.shipbars.update({
      where: { uuid: req.params.id },
      data: { isActive: "false" },
    });

    return res.status(200).send({ success: false });
  } else {
    const data = await prisma.shipbars.findMany({
      where: {
        shop: test_session.shop,
        isActive: "true",
      },
    });

    if (data.length < 1) {
      const data = await prisma.shipbars.update({
        where: { uuid: req.params.id },
        data: { isActive: "true" },
      });
      return res.status(200).send({ success: true });
    } else {
      await prisma.shipbars
        .update({
          where: { uuid: data[0].uuid },
          data: { isActive: "false" },
        })
        .then(async (value) => {
          await prisma.shipbars.update({
            where: { uuid: req.params.id },
            data: { isActive: "true" },
          });
        });

      return res.status(200).send({ success: true });
    }
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const deleteUser = await prisma.shipbars.delete({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).send(deleteUser);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get("/getBanner", async (req, res) => {
  try {
    const data = await prisma.shipbars.findMany({
      where: {
        shop: String(req.query.shop),
        isActive: "true",
      },
    });
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get("/theme", async (req, res) => {
  try {
    const session = await Shopify.Utils.loadCurrentSession(req, res);
    const { Theme } = await import(
      `@shopify/shopify-api/dist/rest-resources/${Shopify.Context.API_VERSION}/index.js`
    );
    const theme = await Theme.all({ session });
  } catch (error) {
    console.log(`Something went wrong when getting themes.`);
  }
});

export default router;
