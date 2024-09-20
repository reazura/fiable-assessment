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
      <Grid key={index} size={rowSize} className="bg-white min-h-20 min-w-3 border-2 border-black border-solid">
        {
          !errors && Math.floor(index / colCount) == y && index % rowCount == x &&
          (<Target rotation={rotation!} />)
        }
      </Grid>
    );
  }

  return (
    <>
      <p className="text-red-500 min-h-6">{errors}</p>
      <Grid container rowSpacing={1} columnSpacing={1}>
        {elements}
      </Grid>
    </>
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
  if (!input)
    return { errors: "missing input" };

  const [coords, direction] = input.split(' ');
  if (!coords || !direction)
    return { errors: "missing input" };

  const parsedDirection = CardinalDirections[direction.toLowerCase() as keyof typeof CardinalDirections];
  if (!parsedDirection)
    return { errors: "unknown direction" };

  const [x, y] = coords.split(',').map(x => +x);
  if (x < 0 || x >= rowCount)
    return { errors: `x-input must be between 0 and ${rowCount}` };

  if (y < 0 || y >= colCount)
    return { errors: `y-input must be between 0 and ${colCount}` };

  return { x, y, direction: parsedDirection };
}