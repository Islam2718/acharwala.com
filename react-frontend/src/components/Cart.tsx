import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import config from '../config';
import { clearCart, removeFromCart, decreaseQuantity, increaseQuantity } from "../store/cartSlice";
const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };
  return (
    <div>
      {cartItems.length > 0 ? (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {cartItems.map((item) => (
            <li
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
                borderBottom: "1px solid #ccc",
                paddingBottom: "10px",
              }}
            >
              <div>
                <img
                  src={ config.fileUrl1 + item.thumb}
                  style={{ width: "50px", marginRight: "10px" }}
                />
                <strong>{item.name}</strong>
              </div>
              <div>
              <button
                className="btn btn-sm text-danger"
                onClick={() => dispatch(decreaseQuantity(item.id))}
              >
                -
              </button>
              <span className="mx-2">{item.quantity}</span>
              <button
                className="btn btn-sm text-success"
                onClick={() => dispatch(increaseQuantity(item.id))}
              >
                +
              </button>
                &nbsp; X &#2547;{item.price} ={" "}
                <strong>&#2547;{item.totalPrice}</strong>

                <button onClick={() => handleRemoveFromCart(item.id)} className="btn text-danger p-1 fs-6" style={{ marginLeft: "10px" }}>
                X
              </button>
              </div>
              
            </li>
          ))}
        </ul>
        
      ) : (
        <p className="text-center fs-6">কার্টে কিছু নেই</p>
      )}
    </div>
  );
};

export default Cart;

