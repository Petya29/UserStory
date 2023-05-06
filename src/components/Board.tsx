import { List } from "./partials/List";
import { Divider } from "./ui/data-display";
import { Container } from "./ui/layout";
import { Paper } from "./ui/surfaces";

export const Board = () => {
    return (
        <Container
            className="mt-12 w-full mx-4"
            maxWidth="md"
            disableGutters
        >
            <Paper className="w-full">
                <div className="text-center text-2xl divide-x-2">User Story</div>
                <Divider className="my-4" />
                <div><List /></div>
            </Paper>
        </Container>
    )
}
