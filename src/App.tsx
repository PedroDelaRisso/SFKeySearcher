import './App.css'
// @deno-types="@types/react"
import { useState } from 'react'

import { SoulFrameService } from "./RedditService.ts";

function App() {
  const service = SoulFrameService;
  const [keys, setKeys] = useState([])
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authErrorOccurred, setAuthErrorOccured] = useState(false);
  const [lastDayFilter, setLastDayFilter] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [clientId, setClientId] = useState('');
  const [secret, setSecret] = useState('');

  const getAndSetKeys = () => {
    setLoading(true);
    setKeys([]);
    const _keys = service.GetKeysInComments(lastDayFilter)
      .then((response) => setKeys(response as []))
      .catch(() => setAuthErrorOccured(true))
      .finally(() => {
        setClicked(true);
        setLoading(false);
      });
  }

  const copyToClipboard = (key: string) => {
    const keyAux = decodeHTMLEntities(key);
    navigator.clipboard.writeText(keyAux)
      .then(() => console.log('Copied to clipboard'))
      .catch(err => console.error('Error copying to clipboard:', err));
  }

  const decodeHTMLEntities = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = text;
    return textArea.value;
  }

  return (
    <>
      <div className="card">
        <div>
          <h1 className="mb-2">SFKeySearcher <span className="align-super text-sm">v1.5</span></h1>
          <p>SoulFrame Key Searcher</p>
          <p className="mt-4">It looks for recent comments on the <a href="https://www.reddit.com/r/SoulFrame/comments/1ih1iit/code_sharing_megathread_2/?sort=new" target="_blank" rel="noopener noreferrer">code sharing megathread</a> containing keys.</p>
          <p className="mt-4">
            Redeem your key or register <a href="https://www.soulframe.com/en/promocodes" target="_blank">here</a>!
          </p>
          <input className="mr-2" type="checkbox" name="lastDayFilter" id="lastDayFilter" defaultChecked={lastDayFilter} onChange={() => setLastDayFilter(!lastDayFilter)} />
          <label htmlFor="lastDayFilter">Only show comments posted in the last 24 hours</label>
          <div className="mb-4">
            </div>
            {
              !authErrorOccurred
                ? (
                  <div>
                    <button onClick={() => getAndSetKeys()}>
                      Search
                    </button>
                  </div>
                )
                : ''
            }
            {
              keys.length > 0
                ? (
                  <>
                    <ul className="flex-column justify-around">
                      {
                        keys.map(({key, posted}) => (
                          <li className="py-2 border-b-2 border-[#2e2e2e]">
                            <p dangerouslySetInnerHTML={{__html: decodeHTMLEntities(key)}} className="mr-2 font-black font-mono text-left">
                            </p>
                            <span>
                              <i>
                                { posted }
                              </i>
                            </span>
                            <button className="ml-2" onClick={() => copyToClipboard(key)}>Copy</button>
                          </li>
                        ))
                      }
                    </ul>
                    <br />
                  </>
                )
                : !loading && !authErrorOccurred && clicked ? (
                  <>
                    <div className="my-2">
                      <p>No comments found :(</p>
                    </div>
                  </>
              )
              : loading ? (
                <>
                  <div>
                    <p className="my-2 italic">Loading...</p>
                  </div>
                </>
              )
              : authErrorOccurred ? (
                <>
                  <div className="flex-column w-full text-left">
                    <h1 className="text-red-500 text-center">Oops.</h1>

                    <p className="text-center">Looks like you're not authenticated on the Reddit API. Please insert your API keys below:</p>
                    <div className="text-center">
                      <i><a href="https://www.reddit.com/prefs/apps" target="_blank">(You can click here to check your API keys)</a></i>
                    </div>
                    <br />
                    <label>Reddit username:&nbsp;</label>
                    <input className="w-full mb-2 bg-[#2e2e2e]" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <br />
                    <label>Reddit password:&nbsp;</label>
                    <input className="w-full mb-2 bg-[#2e2e2e]" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <br />
                    <label>Client ID:&nbsp;</label>
                    <input className="w-full mb-2 bg-[#2e2e2e]" type="password" value={clientId} onChange={(e) => setClientId(e.target.value)} />
                    <br />
                    <label>Secret:&nbsp;</label>
                    <input className="w-full mb-2 bg-[#2e2e2e]" type="password" value={secret} onChange={(e) => setSecret(e.target.value)} />
                    <br />
                    <button onClick={() => service.ApiLogin(clientId, secret, username, password).then(() => { setAuthErrorOccured(false); getAndSetKeys(); })}>Login</button>
                  </div>
                  <br />
                </>
              )
              : ''
            }
        </div>
        <div className="fixed bottom-0 left-0 right-0 bg-[#222] p-4 text-center text-[#7c7c7c]">
          <p className="text-2xl font-bold">Important information</p>
          <p className="my-3">
            This application uses the <a className="text-[#0079d3]" href="https://www.reddit.com/dev/api/">Reddit API</a>.
          </p>
          <p className="mt-3">
            It is supposed to run locally on your computer. Don't deploy it to the internet and don't forget to clear the session storage after usage (a new login will be required)!
          </p>
          <div className="mt-5">
            <button onClick={() => sessionStorage.clear()}>Clear session storage</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
