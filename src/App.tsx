import {
  Container,
  createStyles,
  FileInput,
  MantineProvider,
  rem,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { levenshteinDistance } from "./levenshtein";

async function calc(f1: File, f2: File) {
  const s1 = await f1.text();
  const s2 = await f2.text();

  return levenshteinDistance(s1, s2);
}

export default function App() {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    if (file1 !== null && file2 !== null) {
      setResult(-1);
      calc(file1, file2).then((dist) => {
        setResult(dist);
      });
    } else {
      setResult(null);
    }
  }, [file1, file2]);

  const { classes } = useStyles();

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Container>
        <h1>Levenshtein Distance Calculator</h1>
        <p>
          Select two text files to calculate their{" "}
          <a
            href="https://en.wikipedia.org/wiki/Levenshtein_distance"
            target="_blank"
          >
            Levenshtein distance
          </a>
        </p>
        <FileInput
          value={file1}
          onChange={setFile1}
          label="File 1"
          placeholder="Click to select file"
          className={classes.input}
        />
        <FileInput
          value={file2}
          onChange={setFile2}
          label="File 2"
          placeholder="Click to select file"
          className={classes.input}
        />
        {result &&
          (result > 0 ? (
            <p>
              The Levenshtein distance of these two files is{" "}
              <span className={classes.result}>{result}</span>.
            </p>
          ) : (
            <p>Calculating...</p>
          ))}
      </Container>
    </MantineProvider>
  );
}

const useStyles = createStyles((theme) => ({
  input: {
    maxWidth: rem(200),
  },
  result: {
    fontWeight: 700,
  },
}));
