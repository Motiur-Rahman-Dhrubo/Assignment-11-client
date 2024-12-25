import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const MyCars = () => {

    const [myCar, setMyCar] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch(`http://localhost:5000/my_car?email=${user.email}`)
            .then(res => res.json())
            .then(data => setMyCar(data))
    }, [user.email])

    console.log(myCar);

    return (
        <div>
            <h1 className="font-bold text-red-700 text-5xl text-center bg-gray-400 py-96">this is My Cars</h1>
        </div>
    );
};

export default MyCars;