import { Button } from "@mui/material";

import { CourseItemType } from "../Results/Results";

import { Wrapper } from "./Item.styles";

type Props = {
    item: CourseItemType;
}

const Item: React.FC<Props> = ({item}) => (
    <Wrapper>
        <div>
            <h3>{item.title}</h3>
            <h5>{item.text}</h5>
        </div>
    </Wrapper>
)

export default Item;