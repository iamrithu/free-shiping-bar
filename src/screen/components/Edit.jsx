import {
  Card,
  Button,
  Stack,
  Layout,
  TextField,
  Select,
} from "@shopify/polaris";

import { useAppBridge } from "@shopify/app-bridge-react";
import { userLoggedInFetch } from "../../App";

import { useState, useCallback, useEffect } from "react";

const Edit = ({ getTemplate, closeTemplate, value }) => {
  const app = useAppBridge();
  const fetch = userLoggedInFetch(app);

  const options = [
    { label: "Fixed", value: "fixed" },
    { label: "Scrollable ", value: "absolute" },
  ];
  const closeButton = [
    { label: "NO", value: "NO" },
    { label: "YES", value: "YES" },
  ];
  const CurrencyPosition = [
    { label: "Place symbol before the amount", value: "before" },
    { label: "Place symbol after the amount", value: "after" },
  ];
  const Currency = [
    { label: "--", value: "" },
    { label: "India Rupees", value: "₹" },
    { label: "United State Dollars", value: "$" },
    { label: "United Kingdom", value: "£" },
    { label: "Euro", value: "€" },
    { label: "Canada", value: "$" },
  ];
  const fontOPT = [
    {
      label: "Helvetica",
      value: "Helvetica",
    },
    {
      label: "Assistant",
      value: "Assistant",
    },
    {
      label: "Avenir Next",
      value: "Avenir Next",
    },
    {
      label: "Oswald",
      value: "Oswald",
    },
    {
      label: "Anonymous Pro",
      value: "Anonymous Pro",
    },
    {
      label: "Archivo",
      value: "Archivo",
    },
    {
      label: "Questrial",
      value: "Questrial",
    },
    {
      label: "Americana",
      value: "Americana",
    },
    {
      label: "Quattrocento Sans",
      value: "Quattrocento Sans",
    },
    {
      label: "Futura",
      value: "Futura",
    },
    {
      label: "Electra",
      value: "Electra",
    },
  ];
  const [id, setId] = useState();
  const [name, set_name] = useState();
  const [close_button, setCloseButton] = useState("NO");
  const [content, set_content] = useState("");
  const [background_color, set_background_color] = useState("");
  const [font_color, set_font_color] = useState("");
  const [special_font_color, set_special_font_color] = useState("#1A0D12");
  const [font_family, set_font_family] = useState("");
  const [font_size, set_font_size] = useState("");
  const [selected, setSelected] = useState("fixed");
  const [currency, setCurrency] = useState("");
  const [shipingGoal, setShipingGoal] = useState("");
  const [currencyPosition, setCurrencyPosition] = useState("before");
  const handleSelectChange = useCallback((value) => setSelected(value), []);
  const fontSelectChange = useCallback((value) => set_font_family(value), []);
  const currencyChange = useCallback((value) => setCurrency(value), []);
  const currencyPositionChange = useCallback(
    (value) => setCurrencyPosition(value),
    []
  );

  async function update() {
    var template = {
      name: name,
      shipBar: content,
      background: background_color,
      position: selected,
      fontColor: font_color,
      specialTextColor: special_font_color,
      fontFamily: font_family,
      fontSize: font_size,
      shipingGoal: shipingGoal,
      currency: currency,
      currencyPosition: currencyPosition,
      currencyContent:
        currencyPosition === "after"
          ? shipingGoal + currency
          : currency + shipingGoal,
      closeButton: close_button,
    };
    await fetch(`/updateUser/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(template),
    });
    closeTemplate();
    getTemplate();
  }
  useEffect(async () => {
    const user = await fetch(`/getUser/${value}`).then((res) => res.json());
    setId(user.uuid);
    set_name(user.name);
    setCloseButton(user.closeButton);
    set_content(user.content);
    set_background_color(user.background);
    set_font_color(user.fontColor);
    set_special_font_color(user.specialTextColor);
    set_font_family(user.fontFamily);
    set_font_size(user.fontSize);
    setSelected(user.position);
    setCurrency(user.currency);
    setShipingGoal(user.shipingGoal);
    setCurrencyPosition(user.currencyPosition);
  }, []);

  return (
    <Layout>
      <Layout.Section oneHalf>
        <Card title="Content Configuration :" sectioned>
          <TextField
            label="Shippbar Name :"
            value={name}
            onChange={set_name}
            autoComplete="off"
          />

          <TextField
            label="Initial Message :"
            type="text"
            value={content}
            onChange={set_content}
            autoComplete="off"
          />
          <TextField
            label="Free Shiping Goal :"
            type="number"
            value={shipingGoal}
            onChange={setShipingGoal}
            autoComplete="off"
          />
          <Select
            label="Currency :"
            options={Currency}
            onChange={currencyChange}
            value={currency}
          />
          <TextField
            label="Currency Symbol :"
            value={currency}
            autoComplete="off"
          />
          <Select
            label="Currency Position :"
            options={CurrencyPosition}
            onChange={currencyPositionChange}
            value={currencyPosition}
          />
        </Card>
      </Layout.Section>
      <Layout.Section oneHalf>
        <Card title="Design Configuration :" sectioned>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              height: "50px",
              width: "95%",
            }}
          >
            <lable
              style={{
                fontSize: "15px",
                fontWeight: "400",
                marginRight: "5%",
              }}
            >
              Background Color :
            </lable>
            <input
              value={background_color}
              type="color"
              onChange={(e) => set_background_color(e.target.value)}
              autoComplete="off"
              style={{ width: "200px", height: "40px", marginLeft: "8px" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              height: "50px",
              width: "95%",
            }}
          >
            <lable
              style={{
                fontSize: "15px",
                fontWeight: "400",
                marginRight: "6.8%",
              }}
            >
              Text Color :
            </lable>
            <input
              value={font_color}
              type="color"
              onChange={(e) => set_font_color(e.target.value)}
              autoComplete="off"
              style={{ width: "200px", height: "40px", marginLeft: "53px" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              height: "50px",
              width: "95%",
            }}
          >
            <lable
              style={{
                fontSize: "15px",
                fontWeight: "400",
                marginRight: "6.8%",
              }}
            >
              Special Text Color :
            </lable>
            <input
              value={special_font_color}
              type="color"
              onChange={(e) => set_special_font_color(e.target.value)}
              autoComplete="off"
              style={{ width: "200px", height: "40px" }}
            />
          </div>
          <Select
            label="Font Family :"
            options={fontOPT}
            onChange={fontSelectChange}
            value={font_family}
          />

          <TextField
            label=" Choose Font-Size :"
            type="number"
            value={font_size}
            onChange={set_font_size}
            autoComplete="off"
          />
          <Select
            label="Choose a Display Position :"
            options={options}
            onChange={handleSelectChange}
            value={selected}
          />
          <Select
            label="Include Close Button :"
            options={closeButton}
            onChange={setCloseButton}
            value={close_button}
          />
        </Card>
      </Layout.Section>
      <Layout.Section fullWidth>
        <Stack distribution="trailing">
          <Button onClick={closeTemplate}>Cancel</Button>
          <Button primary onClick={update}>
            Edit Template
          </Button>
        </Stack>
      </Layout.Section>
    </Layout>
  );
};

export default Edit;
