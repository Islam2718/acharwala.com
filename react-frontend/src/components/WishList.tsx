import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import config from '../config';
import { removeFromWishlist } from "../store/wishlistSlice";
const Wishlist = () => {
  const wishlist  = useSelector((state: RootState) => state.wishlist.items);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromWishlist(id));
  };
  return (
    <div>
      {wishlist.length > 0 ? (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {wishlist.map((item) => (
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
               &#2547;{item.price} ={" "}
               <button onClick={() => {
                    if (item.id !== null && item.id !== undefined) {
                        handleRemoveFromCart(item.id);
                    }
                }} className="btn text-danger p-1 fs-6" style={{ marginLeft: "10px" }}>
                    X
                </button>
              </div>
              
            </li>
          ))}
        </ul>
        
      ) : (
        <p className="text-center fs-6 ">পছন্দের পণ্য নেই</p>
      )}
    </div>
  );
};

export default Wishlist;

