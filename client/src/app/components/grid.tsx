import Grid from "@mui/material/Grid2";
import Target from "./target";

const rowCount = 5;
const colCount = 5;
const rowSize = 12 / rowCount
const cellCount = rowCount * colCount;

enum CardinalDirections { north = "NORTH", east = "EAST", south = "SOUTH", west = "WEST" }

type MainGridParams = {
  input: string;
}

export default function MainGrid({ input }: MainGridParams) {
  const { x, y, direction, errors } = tryParseInput(input);

  const rotation = directionToRotation(direction);

  let elements = [];
  for (let index = 0; index < cellCount; index++) {
    elements.push(
      <Grid size={rowSize} className="bg-white min-h-20 min-w-3">
        {
          !errors && Math.floor(index / colCount) == y && index % rowCount == x &&
          (<Target rotation={rotation!} />)
        }
      </Grid>
    );
  }

  return (
    <Grid container rowSpacing={1} columnSpacing={1}>
      {elements}
    </Grid>
  );
}

function directionToRotation(input: CardinalDirections | undefined) {
  if (input == CardinalDirections.north)
    return 0;
  if (input == CardinalDirections.east)
    return 90;
  if (input == CardinalDirections.south)
    return 180;
  if (input == CardinalDirections.west)
    return 270;

  return null;
}

function tryParseInput(input: string) {
  const [coords, direction] = input.split(' ');
  if (!coords || !direction)
    return { errors: "1" };

  const parsedDirection = CardinalDirections[direction.toLowerCase() as keyof typeof CardinalDirections];
  if (!parsedDirection)
    return { errors: "2" };

  const [x, y] = coords.split(',').map(x => +x);
  if (x < 0 || x >= rowCount)
    return { errors: "3" };
  if (y < 0 || y >= colCount)
    return { errors: "4" };

  return { x, y, direction: parsedDirection };
}