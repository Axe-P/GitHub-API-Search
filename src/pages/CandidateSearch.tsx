import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';
// Importing useState and useEffect from react.
// Importing searchGithub, and searchGithub user from our API.
// Finally importing the interface, again to define how data will be displayed on screen.

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  // Setting the initial state of the candidates, using the Candidate interface.
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  // I am using this value to keep track of what candidate I am viewing.
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  // This initializes currentCandidate as null, setCurrentCandidate will be used later to update the state.

  useEffect(() => {
    const fetchCandidates = async () => {
      // Using fetch to grab the Candidates information.
      const data = await searchGithub();
      // Using the exported function from our API to grab the data.
      setCandidates(data);
      // Updating the data that was fetched to our candidates
      if (data.length > 0) {
        // Checking to make sure we received data back.
        const detailedCandidate = await searchGithubUser(data[0].login);
        // We're using the searchGithubUser (from the API) function to grab the data we want displayed
        setCurrentCandidate(detailedCandidate);
        // Setting the CurrentCandidate, to have the information that was grabbed.
      }
    };
    fetchCandidates();
    // This is calling the function to be ran.
  }, []);
  // This function will only run once once when the webpage is first opened.

  const handleNext = async () => {
    if (candidates.length > 0) {
      // Checking to see if we have data for the candidates.
      const nextIndex = (currentIndex + 1) % candidates.length;
      // were using the useState index from line 11 to keep track of what candidate we're viewing.
      // The modulus is being used so that when we get to the end of the retrieved candidates it will loop back to index 0 so information is still being displayed.
      setCurrentIndex(nextIndex);
      // Setting new index value for new candidate information to be displayed.
      const nextCandidate = candidates[nextIndex];
      // Creating a nextCandidate to with the new index value from the candidates to be displayed.
      const detailedCandidate = await searchGithubUser(nextCandidate.login);
      // Using the function searchGithubUser again, to get the desired information from that candidate.
      setCurrentCandidate(detailedCandidate);
      // Setting the new information for the new candidate.
    }
  };

  const handleSave = () => {
    if (currentCandidate) {
      const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      // This is getting the information from localStorage, if there even is any, if not going to set it to an empty array for the value.
      savedCandidates.push(currentCandidate);
      // This will add the Candidate to the savedCandidates array.
      localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
      // This is setting the savedCandidates value in local storage to be updated with the array.
      handleNext();
      // Setting it to the next candidate.
    }
  };

  return (
    <div>
      <h1>Candidate Search</h1>
      {currentCandidate ? (
        <div>
          <img src={currentCandidate.avatar_url} alt={currentCandidate.login} />
          <p>Name: {currentCandidate.name}</p>
          <p>Username: {currentCandidate.login}</p>
          <p>Location: {currentCandidate.location}</p>
          <p>Email: {currentCandidate.email}</p>
          <p>Company: {currentCandidate.company}</p>
          <p>Profile: <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">View Profile</a></p>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleNext}>Next</button>
        </div>
      ) : (
        <p>No candidates available</p>
      )}
    </div>
  );
};

export default CandidateSearch;