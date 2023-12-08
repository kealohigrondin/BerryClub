import axios from "axios";
import React, { useEffect, useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
//import EditIcon from "@mui/icons-material/Edit";

import { unConvert } from "../utils/unConvert";
import { Item } from "../models/cart";

function CartList() {
  const [items, setItems] = useState<Item[]>([]);
  const [loaded, setLoaded] = useState(false);

  const deleteItem = async (name: string) => {
    console.debug("deleting", name);
    const res = await axios.post("/api/cart/remove", { data: name });
    if (res.data) {
      for (let i = 0; i < res.data.items.length; i++) {
        res.data.items[i].quantity = unConvert(
          res.data.items[i].quantity,
          res.data.items[i].unit
        );
      }
      setItems(res.data.items);
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      if (!loaded) {
        const res = await axios.get("/api/cart");
        //unconvert all quantities here
        if (res.data) {
          for (let i = 0; i < res.data.items.length; i++) {
            res.data.items[i].quantity = unConvert(
              res.data.items[i].quantity,
              res.data.items[i].unit
            );
          }
          setItems(res.data.items);
          setLoaded(true);
        }
      }
    };
    fetchCart();
  },);

  if (loaded && items.length === 0) {
    return <p>Empty cart</p>;
  }
  return items && loaded ? (
    <table>
      <th></th>
      <tbody>
        {items.map(({ name, quantity, unit }, i) => (
          <tr key={`row${i}-${name}`}>
            <td>
              <strong>{name}</strong>
            </td>
            <td>
              {quantity} {unit}
            </td>
            {/* <td sx={{ padding: "0", width: "1%" }}>
                    <Button sx={{ minWidth: "0px" }} disabled={true}>
                      <EditIcon sx={{ color: "lightGrey" }} />
                    </Button>
                  </td> */}
            <td>
              <button onClick={() => deleteItem(name)}>
                <DeleteIcon sx={{ color: "red" }} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <div className="ui active loader"></div>
  )
}
export default CartList;
