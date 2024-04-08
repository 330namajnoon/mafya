import { useContext } from "react";
import { colors } from "../../config";
import { Background, Button, Buttons } from "./styles";
import AppContext from "../../contexts/AppContext";

const StartPage = () => {
    const gameState = useContext(AppContext);

    const setStatus = (status: "GOD" | "USER") => {
        gameState.setStatus(status);
    }

    return (
        <Background>
            <Buttons>
                <Button onClick={() => {setStatus("USER")}} justify_content="start">
                    <svg width="282" height="50" viewBox="0 0 282 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.75 0.75H279.981L223.721 49.25H0.75V0.75Z" fill={colors[2]} fill-opacity="0.4" />
                        <path d="M0.75 0.75H279.981L223.721 49.25H0.75V0.75Z" stroke={colors[1]} stroke-width="1.5" />
                        <path d="M0.75 0.75H279.981L223.721 49.25H0.75V0.75Z" stroke={colors[1]} stroke-width="1.5" />
                        <path d="M0.75 0.75H279.981L223.721 49.25H0.75V0.75Z" stroke={colors[1]} stroke-width="1.5" />
                        <path d="M0.75 0.75H279.981L223.721 49.25H0.75V0.75Z" stroke={colors[1]} stroke-width="1.5" />
                        <path d="M0.75 0.75H279.981L223.721 49.25H0.75V0.75Z" stroke={colors[1]} stroke-width="1.5" />
                        <path xmlns="http://www.w3.org/2000/svg" d="M47.321 29V18.0909H53.9048V19.2628H48.642V22.9489H53.5639V24.1207H48.642V27.8281H53.9901V29H47.321ZM64.9364 18.0909V29H63.658L57.7134 20.4347H57.6069V29H56.2859V18.0909H57.5643L63.5302 26.6776H63.6367V18.0909H64.9364ZM66.9832 19.2628V18.0909H75.165V19.2628H71.7346V29H70.4136V19.2628H66.9832ZM77.2038 29V18.0909H80.8899C81.7422 18.0909 82.4418 18.2365 82.9886 18.5277C83.5355 18.8153 83.9403 19.2113 84.2031 19.7156C84.4659 20.2198 84.5973 20.7933 84.5973 21.4361C84.5973 22.0788 84.4659 22.6488 84.2031 23.146C83.9403 23.6431 83.5373 24.0337 82.994 24.3178C82.4506 24.5984 81.7564 24.7386 80.9112 24.7386H77.9283V23.5455H80.8686C81.451 23.5455 81.9197 23.4602 82.2749 23.2898C82.6335 23.1193 82.8928 22.8778 83.0526 22.5653C83.2159 22.2493 83.2976 21.8729 83.2976 21.4361C83.2976 20.9993 83.2159 20.6175 83.0526 20.2908C82.8892 19.9641 82.6282 19.712 82.2695 19.5344C81.9109 19.3533 81.4368 19.2628 80.8473 19.2628H78.5249V29H77.2038ZM82.3388 24.0994L85.0234 29H83.4893L80.8473 24.0994H82.3388ZM87.246 29H85.8611L89.8667 18.0909H91.2304L95.2361 29H93.8511L90.5912 19.8168H90.5059L87.246 29ZM87.7574 24.7386H93.3398V25.9105H87.7574V24.7386ZM96.9353 29V18.0909H100.621C101.474 18.0909 102.173 18.2365 102.72 18.5277C103.267 18.8153 103.672 19.2113 103.935 19.7156C104.197 20.2198 104.329 20.7933 104.329 21.4361C104.329 22.0788 104.197 22.6488 103.935 23.146C103.672 23.6431 103.269 24.0337 102.725 24.3178C102.182 24.5984 101.488 24.7386 100.643 24.7386H97.6597V23.5455H100.6C101.182 23.5455 101.651 23.4602 102.006 23.2898C102.365 23.1193 102.624 22.8778 102.784 22.5653C102.947 22.2493 103.029 21.8729 103.029 21.4361C103.029 20.9993 102.947 20.6175 102.784 20.2908C102.621 19.9641 102.36 19.712 102.001 19.5344C101.642 19.3533 101.168 19.2628 100.579 19.2628H98.2563V29H96.9353ZM102.07 24.0994L104.755 29H103.221L100.579 24.0994H102.07ZM111.196 29H109.811L113.817 18.0909H115.181L119.186 29H117.801L114.541 19.8168H114.456L111.196 29ZM111.708 24.7386H117.29V25.9105H111.708V24.7386ZM132.263 18.0909H133.584V25.3139C133.584 26.0597 133.409 26.7255 133.057 27.3114C132.709 27.8938 132.217 28.3537 131.581 28.6911C130.946 29.0249 130.2 29.1918 129.344 29.1918C128.488 29.1918 127.743 29.0249 127.107 28.6911C126.471 28.3537 125.978 27.8938 125.626 27.3114C125.278 26.7255 125.104 26.0597 125.104 25.3139V18.0909H126.425V25.2074C126.425 25.7401 126.542 26.2141 126.777 26.6296C127.011 27.0415 127.345 27.3665 127.778 27.6044C128.215 27.8388 128.737 27.956 129.344 27.956C129.952 27.956 130.474 27.8388 130.91 27.6044C131.347 27.3665 131.681 27.0415 131.912 26.6296C132.146 26.2141 132.263 25.7401 132.263 25.2074V18.0909ZM144.873 18.0909V29H143.595L137.65 20.4347H137.543V29H136.222V18.0909H137.501L143.467 26.6776H143.573V18.0909H144.873ZM147.964 29H146.579L150.585 18.0909H151.948L155.954 29H154.569L151.309 19.8168H151.224L147.964 29ZM148.475 24.7386H154.058V25.9105H148.475V24.7386ZM167.838 20.8182C167.774 20.2784 167.515 19.8594 167.06 19.5611C166.605 19.2628 166.048 19.1136 165.387 19.1136C164.904 19.1136 164.482 19.1918 164.12 19.348C163.761 19.5043 163.48 19.7191 163.278 19.9925C163.079 20.266 162.98 20.5767 162.98 20.9247C162.98 21.2159 163.049 21.4663 163.188 21.6758C163.33 21.8817 163.511 22.054 163.731 22.1925C163.951 22.3274 164.182 22.4393 164.423 22.5281C164.665 22.6133 164.887 22.6825 165.089 22.7358L166.197 23.0341C166.481 23.1087 166.797 23.2116 167.145 23.343C167.497 23.4744 167.832 23.6538 168.152 23.881C168.475 24.1048 168.741 24.3924 168.951 24.744C169.161 25.0955 169.265 25.527 169.265 26.0384C169.265 26.6278 169.111 27.1605 168.802 27.6364C168.496 28.1122 168.049 28.4904 167.46 28.771C166.874 29.0515 166.162 29.1918 165.324 29.1918C164.542 29.1918 163.866 29.0657 163.294 28.8136C162.726 28.5614 162.278 28.2099 161.952 27.7589C161.629 27.3079 161.446 26.7841 161.403 26.1875H162.767C162.802 26.5994 162.941 26.9403 163.182 27.2102C163.427 27.4766 163.736 27.6754 164.109 27.8068C164.485 27.9347 164.89 27.9986 165.324 27.9986C165.828 27.9986 166.281 27.9169 166.682 27.7536C167.083 27.5866 167.401 27.3558 167.635 27.0611C167.87 26.7628 167.987 26.4148 167.987 26.017C167.987 25.6548 167.886 25.3601 167.683 25.1328C167.481 24.9055 167.214 24.7209 166.884 24.5788C166.554 24.4368 166.197 24.3125 165.814 24.206L164.471 23.8224C163.619 23.5774 162.944 23.2276 162.447 22.7731C161.95 22.3185 161.701 21.7237 161.701 20.9886C161.701 20.3778 161.866 19.8452 162.197 19.3906C162.531 18.9325 162.978 18.5774 163.539 18.3253C164.104 18.0696 164.734 17.9418 165.43 17.9418C166.133 17.9418 166.758 18.0678 167.305 18.32C167.852 18.5685 168.285 18.9094 168.605 19.3427C168.928 19.7759 169.098 20.2678 169.116 20.8182H167.838ZM171.885 29H170.5L174.505 18.0909H175.869L179.875 29H178.49L175.23 19.8168H175.145L171.885 29ZM172.396 24.7386H177.978V25.9105H172.396V24.7386ZM181.574 29V18.0909H182.895V27.8281H187.966V29H181.574ZM191.147 29H189.762L193.768 18.0909H195.132L199.137 29H197.752L194.493 19.8168H194.407L191.147 29ZM191.659 24.7386H197.241V25.9105H191.659V24.7386Z" fill="white"/>
                    </svg>
                </Button>
                <Button onClick={() => {setStatus("GOD")}} justify_content="end">
                    <svg width="280" height="50" viewBox="0 0 280 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M279.25 49.25H2.00781L57.8688 0.75H279.25V49.25Z" fill={colors[2]} fill-opacity="0.56" />
                        <path d="M279.25 49.25H2.00781L57.8688 0.75H279.25V49.25Z" stroke={colors[1]} stroke-width="1.5" />
                        <path d="M279.25 49.25H2.00781L57.8688 0.75H279.25V49.25Z" stroke={colors[1]} stroke-width="1.5" />
                        <path d="M279.25 49.25H2.00781L57.8688 0.75H279.25V49.25Z" stroke={colors[1]} stroke-width="1.5" />
                        <path d="M279.25 49.25H2.00781L57.8688 0.75H279.25V49.25Z" stroke={colors[1]} stroke-width="1.5" />
                        <path d="M279.25 49.25H2.00781L57.8688 0.75H279.25V49.25Z" stroke={colors[1]} stroke-width="1.5" />
                        <path xmlns="http://www.w3.org/2000/svg" d="M100.099 21.5H98.7784C98.7003 21.12 98.5636 20.7862 98.3683 20.4986C98.1765 20.2109 97.9421 19.9695 97.6651 19.7741C97.3917 19.5753 97.0881 19.4261 96.7543 19.3267C96.4205 19.2273 96.0724 19.1776 95.7102 19.1776C95.0497 19.1776 94.4513 19.3445 93.9151 19.6783C93.3825 20.0121 92.9581 20.5039 92.642 21.1538C92.3295 21.8036 92.1733 22.6009 92.1733 23.5455C92.1733 24.4901 92.3295 25.2873 92.642 25.9371C92.9581 26.587 93.3825 27.0788 93.9151 27.4126C94.4513 27.7464 95.0497 27.9134 95.7102 27.9134C96.0724 27.9134 96.4205 27.8636 96.7543 27.7642C97.0881 27.6648 97.3917 27.5174 97.6651 27.3221C97.9421 27.1232 98.1765 26.88 98.3683 26.5923C98.5636 26.3011 98.7003 25.9673 98.7784 25.5909H100.099C100 26.1484 99.8189 26.6474 99.5561 27.0877C99.2933 27.5281 98.9666 27.9027 98.576 28.2116C98.1854 28.517 97.7468 28.7496 97.2603 28.9094C96.7773 29.0692 96.2607 29.1491 95.7102 29.1491C94.7798 29.1491 93.9524 28.9219 93.228 28.4673C92.5036 28.0128 91.9336 27.3665 91.5181 26.5284C91.1026 25.6903 90.8949 24.696 90.8949 23.5455C90.8949 22.3949 91.1026 21.4006 91.5181 20.5625C91.9336 19.7244 92.5036 19.0781 93.228 18.6236C93.9524 18.169 94.7798 17.9418 95.7102 17.9418C96.2607 17.9418 96.7773 18.0217 97.2603 18.1815C97.7468 18.3413 98.1854 18.5756 98.576 18.8846C98.9666 19.19 99.2933 19.5629 99.5561 20.0032C99.8189 20.44 100 20.9389 100.099 21.5ZM102.234 29V18.0909H105.92C106.772 18.0909 107.472 18.2365 108.019 18.5277C108.566 18.8153 108.971 19.2113 109.233 19.7156C109.496 20.2198 109.628 20.7933 109.628 21.4361C109.628 22.0788 109.496 22.6488 109.233 23.146C108.971 23.6431 108.568 24.0337 108.024 24.3178C107.481 24.5984 106.787 24.7386 105.941 24.7386H102.959V23.5455H105.899C106.481 23.5455 106.95 23.4602 107.305 23.2898C107.664 23.1193 107.923 22.8778 108.083 22.5653C108.246 22.2493 108.328 21.8729 108.328 21.4361C108.328 20.9993 108.246 20.6175 108.083 20.2908C107.919 19.9641 107.658 19.712 107.3 19.5344C106.941 19.3533 106.467 19.2628 105.878 19.2628H103.555V29H102.234ZM107.369 24.0994L110.054 29H108.52L105.878 24.0994H107.369ZM111.829 29V18.0909H118.413V19.2628H113.15V22.9489H118.072V24.1207H113.15V27.8281H118.498V29H111.829ZM121.241 29H119.856L123.862 18.0909H125.225L129.231 29H127.846L124.586 19.8168H124.501L121.241 29ZM121.752 24.7386H127.335V25.9105H121.752V24.7386ZM130.93 29V18.0909H134.616C135.469 18.0909 136.168 18.2365 136.715 18.5277C137.262 18.8153 137.667 19.2113 137.93 19.7156C138.192 20.2198 138.324 20.7933 138.324 21.4361C138.324 22.0788 138.192 22.6488 137.93 23.146C137.667 23.6431 137.264 24.0337 136.721 24.3178C136.177 24.5984 135.483 24.7386 134.638 24.7386H131.655V23.5455H134.595C135.178 23.5455 135.646 23.4602 136.001 23.2898C136.36 23.1193 136.619 22.8778 136.779 22.5653C136.942 22.2493 137.024 21.8729 137.024 21.4361C137.024 20.9993 136.942 20.6175 136.779 20.2908C136.616 19.9641 136.355 19.712 135.996 19.5344C135.637 19.3533 135.163 19.2628 134.574 19.2628H132.251V29H130.93ZM136.065 24.0994L138.75 29H137.216L134.574 24.0994H136.065ZM151.903 18.0909H153.224V25.3139C153.224 26.0597 153.048 26.7255 152.697 27.3114C152.349 27.8938 151.857 28.3537 151.221 28.6911C150.585 29.0249 149.84 29.1918 148.984 29.1918C148.128 29.1918 147.382 29.0249 146.747 28.6911C146.111 28.3537 145.617 27.8938 145.266 27.3114C144.918 26.7255 144.744 26.0597 144.744 25.3139V18.0909H146.065V25.2074C146.065 25.7401 146.182 26.2141 146.416 26.6296C146.651 27.0415 146.985 27.3665 147.418 27.6044C147.855 27.8388 148.377 27.956 148.984 27.956C149.591 27.956 150.113 27.8388 150.55 27.6044C150.987 27.3665 151.321 27.0415 151.551 26.6296C151.786 26.2141 151.903 25.7401 151.903 25.2074V18.0909ZM164.513 18.0909V29H163.234L157.29 20.4347H157.183V29H155.862V18.0909H157.14L163.106 26.6776H163.213V18.0909H164.513ZM167.603 29H166.218L170.224 18.0909H171.588L175.593 29H174.209L170.949 19.8168H170.863L167.603 29ZM168.115 24.7386H173.697V25.9105H168.115V24.7386ZM187.477 20.8182C187.413 20.2784 187.154 19.8594 186.7 19.5611C186.245 19.2628 185.688 19.1136 185.027 19.1136C184.544 19.1136 184.122 19.1918 183.759 19.348C183.401 19.5043 183.12 19.7191 182.918 19.9925C182.719 20.266 182.619 20.5767 182.619 20.9247C182.619 21.2159 182.689 21.4663 182.827 21.6758C182.969 21.8817 183.15 22.054 183.37 22.1925C183.591 22.3274 183.821 22.4393 184.063 22.5281C184.304 22.6133 184.526 22.6825 184.729 22.7358L185.837 23.0341C186.121 23.1087 186.437 23.2116 186.785 23.343C187.136 23.4744 187.472 23.6538 187.792 23.881C188.115 24.1048 188.381 24.3924 188.591 24.744C188.8 25.0955 188.905 25.527 188.905 26.0384C188.905 26.6278 188.75 27.1605 188.441 27.6364C188.136 28.1122 187.689 28.4904 187.099 28.771C186.513 29.0515 185.801 29.1918 184.963 29.1918C184.182 29.1918 183.505 29.0657 182.934 28.8136C182.366 28.5614 181.918 28.2099 181.591 27.7589C181.268 27.3079 181.085 26.7841 181.043 26.1875H182.406C182.442 26.5994 182.58 26.9403 182.822 27.2102C183.067 27.4766 183.376 27.6754 183.749 27.8068C184.125 27.9347 184.53 27.9986 184.963 27.9986C185.467 27.9986 185.92 27.9169 186.321 27.7536C186.723 27.5866 187.041 27.3558 187.275 27.0611C187.509 26.7628 187.627 26.4148 187.627 26.017C187.627 25.6548 187.525 25.3601 187.323 25.1328C187.12 24.9055 186.854 24.7209 186.524 24.5788C186.194 24.4368 185.837 24.3125 185.453 24.206L184.111 23.8224C183.259 23.5774 182.584 23.2276 182.087 22.7731C181.59 22.3185 181.341 21.7237 181.341 20.9886C181.341 20.3778 181.506 19.8452 181.836 19.3906C182.17 18.9325 182.618 18.5774 183.179 18.3253C183.743 18.0696 184.374 17.9418 185.07 17.9418C185.773 17.9418 186.398 18.0678 186.945 18.32C187.492 18.5685 187.925 18.9094 188.244 19.3427C188.568 19.7759 188.738 20.2678 188.756 20.8182H187.477ZM191.524 29H190.139L194.145 18.0909H195.509L199.514 29H198.129L194.869 19.8168H194.784L191.524 29ZM192.036 24.7386H197.618V25.9105H192.036V24.7386ZM201.214 29V18.0909H202.535V27.8281H207.606V29H201.214ZM210.787 29H209.402L213.408 18.0909H214.771L218.777 29H217.392L214.132 19.8168H214.047L210.787 29ZM211.298 24.7386H216.881V25.9105H211.298V24.7386Z" fill="white"/>
                    </svg>
                </Button>
            </Buttons>
        </Background>
    )
}

export default StartPage;