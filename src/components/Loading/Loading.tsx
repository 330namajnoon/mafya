import { colors } from "../../config";
import LoadingSvg from "../../assets/loading.svg"

const Loading = () => {
    return (
        <div style={{width: "100vw", height: "100vh", backgroundColor: colors[0], display: "flex", alignItems: "center", justifyContent: "center"}}>
            <img src={LoadingSvg} alt="" />
        </div>
    )
}

export default Loading;