import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { SET_CART } from "../actions/types";

function CartList() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart?.items);
  const [loaded, setLoaded] = useState(false);

  const deleteItem = async (name) => {
    console.debug("deleting", name);
    const res = await axios.post("/api/cart/remove", { data: name });
    dispatch({ type: SET_CART, payload: res.data });
  };

  useEffect(() => {
    const fetchCart = async () => {
      if (!loaded) {
        const res = await axios.get("/api/cart");
        //unconvert all quantities here
        dispatch({ type: SET_CART, payload: res.data });
        if (res) {
          setLoaded(true);
        }
      }
    };
    fetchCart();
  });

  if (loaded && items.length === 0) {
    return <p>Empty cart</p>;
  }
  return (
    <>
      {items && loaded ? (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead></TableHead>
            <TableBody>
              {items.map(({ name, quantity, unit }, i) => (
                <TableRow key={`row${i}-${name}`}>
                  <TableCell sx={{ width: { xs: "60%", sm: "20%" } }}>
                    <strong>{name}</strong>
                  </TableCell>
                  <TableCell>
                    {quantity} {unit}
                  </TableCell>
                  <TableCell sx={{ padding: "0", width: "1%" }}>
                    <Button sx={{ minWidth: "0px" }} disabled={true}>
                      <EditIcon sx={{ color: "lightGrey" }} />
                    </Button>
                  </TableCell>
                  <TableCell sx={{ padding: "0", width: "1%" }}>
                    <Button
                      sx={{ minWidth: "0px" }}
                      onClick={() => deleteItem(name)}
                    >
                      <DeleteIcon sx={{ color: "red" }} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div className="ui active loader"></div>
      )}
    </>
  );
}
export default CartList;
