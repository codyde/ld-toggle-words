//@ts-nocheck
"use client";
import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFlags, useLDClient } from "launchdarkly-react-client-sdk";
import { useToast } from "@/components/ui/use-toast";
import {
  uniqueNamesGenerator,
  Config,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";
import { Inter } from "next/font/google";

type ClueStateType = {
  phrase: string;
  clue: string;
  answer: string;
  option1: string;
  option2: string;
  option3: string;
};

type AnswerType = {
  phrase: string;
  setting: string;
  value: string;
};

type ContextType = {
  name: string;
  key: string;
};

type Props = {};

const inter = Inter({ subsets: ["latin"] });

const Home: React.FC<Props> = () => {
  const customConfig: Config = {
    dictionaries: [adjectives, colors],
    separator: ".",
    length: 2,
  };

  const randomName: string = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
  });

  const shortName: string = uniqueNamesGenerator(customConfig);

  const { toast } = useToast();

  const { newLoginModel: isNewLoginModel, updatedScoring } = useFlags();

  const [count, setCount] = useState<number>(0);
  const [allWords, setAllWords] = useState<ClueStateType[] | undefined>();
  const [answer, setAnswer] = useState<AnswerType[] | undefined>();
  const [word, setWord] = useState<string>("Choose Below!");
  const [name, setName] = useState<string>(shortName);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [clueState, setClueState] = useState<ClueStateType | undefined>();
  const [isToggle1, setIsToggle1] = useState<boolean>(false);
  const [isToggle2, setIsToggle2] = useState<boolean>(false);
  const [isToggle3, setIsToggle3] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const ldclient: LDClient = useLDClient();

  async function setContext(ldclient: LDClient, name: string): Promise<ContextType> {
    const context = await ldclient.getContext();
    context.name = name;
    context.key = name;
    await ldclient.identify(context);
    await ldclient.track("User Login", context);
    return context as ContextType;
  }

  async function trackAndFlush(ldclient: LDClient, event: string, fakeLatency: number) {
    await ldclient.track(event, null, fakeLatency);
    await ldclient.flush();
  }

  function setLoginStatus(setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>, status: boolean, fakeLatency: number) {
    setTimeout(() => {
      setLoggedIn(status);
    }, fakeLatency);
  }


  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
  
    const context = await setContext(ldclient, name);
  
    if (isNewLoginModel === true) {
      const fakeLatency = Math.floor(Math.random() * (100 - 50) + 50);
      await trackAndFlush(ldclient, "Login Latency", fakeLatency);
      setLoginStatus(setLoggedIn, true, fakeLatency);
    } else {
      const fakeLatency = Math.floor(Math.random() * (1000 - 100) + 200); // Generate a delay between 200ms and 300ms
      await trackAndFlush(ldclient, "Login Latency", fakeLatency);
  
      setTimeout(async () => {
        const errorChance = Math.random();
        if (errorChance < 0.5) {
          await ldclient.track("Login Error", context);
          toast({
            variant: "destructive",
            title: "Login Error",
            description: "Oh no! Something went wrong. Please try again.",
          });
          await ldclient.flush();
          setLoggedIn(false);
        } else {
          await ldclient.flush();
          setLoggedIn(true);
        }
      }, fakeLatency);
    }
  }

  async function fetchWords(): Promise<{ allwords: ClueStateType[] }> {
    const response = await fetch("/api");
    const data = await response.json();
    return data;
  }

  async function fetchAnswers(phrase: string): Promise<{ allAnswers: AnswerType[] }> {
    const response = await fetch("/api/getanswers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phrase }),
    });
    if (response.status !== 200) {
      setAnswer(null)
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Failed to fetch answers",
      });
      throw new Error("Failed to fetch answers");
    }
    const data = await response.json();
    console.log(data)
    return data;
  }

  async function fetchData(): Promise<void> {
    const wordsData = await fetchWords();
    setAllWords(wordsData.allwords);
    const randomIndex = Math.floor(Math.random() * wordsData.allwords.length);
    const selectedClue = wordsData.allwords[randomIndex];
    setClueState(selectedClue);
    const answersData = await fetchAnswers(selectedClue.phrase);
    setAnswer(answersData.allAnswers);
  }

  useEffect(() => {
    fetchData();
  }, [count]);

  // When you fetch or change the clue, make sure to reset toggle states
  useEffect(() => {
    if (clueState) {
      setIsToggle1(false);
      setIsToggle2(false);
      setIsToggle3(false);
      setWord("Choose Below"); // Reset the word display
    }
  }, [clueState]);

  async function scoreCheck (word) {
    if (word === clueState.answer) {
      toast({
        variant: "success",
        title: "Correct!",
        description: "You guessed the word correctly!",
      });
      setScore((prevScore) => prevScore + 10);
      setClueState(null); // Increment score by 10
    } else {
      toast({
        variant: "destructive",
        title: "Incorrect!",
        description: "You guessed the word incorrectly!",
      });
      setScore((prevScore) => prevScore - 1); // Decrement score by 1
      setClueState(null);
    }
  }

  async function evaluateToggleStates() {
    if (!clueState) return; // Ensure clueState is defined

    await scoreCheck(word)
    
    setIsToggle1(false);
    setIsToggle2(false);
    setIsToggle3(false);
    setWord("Choose Below");
    setCount((prevCount) => prevCount + 1);
  }

  const handleUpdateWord = (newToggle1: boolean, newToggle2: boolean, newToggle3: boolean) => {
    if (!clueState) return; // Ensure clueState is defined
    const key = `${newToggle1},${newToggle2},${newToggle3}`; // Use the new toggle states directly
console.log(clueState)
    console.log(answer)
    console.log(key)
    // Find the item in the answer array that matches the key
    const matchingItem = answer?.find(
      (item) => item.phrase === clueState.phrase && item.setting === key
    );

    // If a matching item is found, use its value. Otherwise, use a default value.
    const result = matchingItem ? matchingItem.value : "Not found";

    setWord(result); // Update the displayed word
  };

  return (
    <div className="grid bg-ldblack">
      <div className=" grid bg-ldblack text-center justify-center ">
        <img
          src="/logo.png"
          alt="Toggle Words Logo"
          className=" mt-4 w-1/4 mx-auto"
        />
        <h1 className="text-[42px] lg:text-6xl lg:mt-4 font-bold font-audimat wordstext">
          Toggle Words
        </h1>
        <div className="grid bg-ldblack border-0 rounded-none px-4">
          {!loggedIn ? (
            <div className="font-audimat">
              <p className={`${inter.className} font-normal w-full lg:w-2/3 mx-auto my-4 text-[26px] text-gray-200 `}>
                Sign-In and compete in the worlds fastest growing word guessing
                game. Now with more TOGGLES.
              </p>
              <p>Enter Your Name to get Started!</p>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="my-4 text-lg w-full lg:w-1/3 text-center border-2 py-2 border-blue-500 mx-auto"
              />
              <Button
                size="lg"
                onClick={(e) => {
                  handleLogin(e);
                }}
                className="signin rounded-none bg-bankdarkblue text-white font-audimat text-xl "
              >
                Sign-In
              </Button>
            </div>
          ) : (
            <div className="grid mt-4 font-audimat">
              <p className={`${inter.className} font-normal text-md lg:text-2xl pb-4 mx-auto w-full lg:w-1/3`}>
                Hi {name}! Guess the answer by setting the right toggle
                combination
              </p>
              <p className={`${inter.className} font-normal text-2xl pt-2`}>Question</p>
              <p className={`text:xl lg:text-3xl mx-auto pb-4 font-bold ${inter.className} w-full lg:w-2/3`}>
                {clueState ? clueState.clue : "Loading..."}
              </p>

              <div className="flex flex-col mx-auto my-4 pb-4 border-2 rounded-xl border-wordsgrey w-full lg:w-1/3">
                <p className="text-[16px] pt-4 text-gray-200 font-light">
                  Your Answer
                </p>
                <p className={`${inter.className} font-bold text-[28px] text-ldwhite`}>{word}</p>
                <div className="mx-8 space-y-4">
                  <div className="flex flex-row items-center justify-between space-x-4">
                    <Label className={`${inter.className} font-normal text-2xl text-gray-200`} htmlFor="1">
                      {clueState ? clueState.option1 : "Loading..."}
                    </Label>
                    <Switch
                      id="1"
                      checked={isToggle1}
                      className="gradient-switch"
                      onCheckedChange={() => {
                        const newToggle1 = !isToggle1; // Determine the new state
                        setIsToggle1(newToggle1); // Set the new state
                        handleUpdateWord(newToggle1, isToggle2, isToggle3); // Pass the new state directly
                      }}
                    >
                      {clueState ? clueState.option1 : "Loading..."}
                    </Switch>
                  </div>
                  <div className="flex flex-row items-center justify-between space-x-4">
                    <Label className={`${inter.className} font-normal text-2xl text-gray-200`} htmlFor="2">
                      {clueState ? clueState.option2 : "Loading..."}
                    </Label>
                    <Switch
                      id="2"
                      checked={isToggle2}
                      onCheckedChange={() => {
                        const newToggle2 = !isToggle2; // Determine the new state
                        setIsToggle2(newToggle2); // Set the new state
                        handleUpdateWord(isToggle1, newToggle2, isToggle3); // Pass the new state directly
                      }}
                    >
                      {clueState ? clueState.option2 : "Loading..."}
                    </Switch>
                  </div>
                  <div className="flex flex-row items-center justify-between space-x-4">
                    <Label className={`${inter.className} font-normal text-2xl text-gray-200`} htmlFor="3">
                      {clueState ? clueState.option3 : "Loading..."}
                    </Label>
                    <Switch
                      id="3"
                      checked={isToggle3}
                      onCheckedChange={() => {
                        const newToggle3 = !isToggle3; // Determine the new state
                        setIsToggle3(newToggle3); // Set the new state
                        handleUpdateWord(isToggle1, isToggle2, newToggle3); // Pass the new state directly
                      }}
                    >
                      {clueState ? clueState.option3 : "Loading..."}
                    </Switch>
                  </div>
                </div>
              </div>
              <p className="pt-2">Score</p>
              <p className={`text-gray-200 pt-2 text-2xl ${inter.className}  font-bold`}>
                {score}
              </p>
              <Button
                onClick={evaluateToggleStates}
                className={`score rounded-none bg-bankdarkblue text-white ${inter.className} font-normal text-xl w-1/3 mt-2 mx-auto mb-4`}
              >
                Submit
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
