import {Slide} from "@material-ui/core";
import {TransitionProps} from "@material-ui/core/transitions";
import {forwardRef, ReactElement, Ref} from "react";

const SlideUp = forwardRef(function Transition(
    props: TransitionProps & { children?: ReactElement<any, any> },
    ref: Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
})
export default SlideUp
