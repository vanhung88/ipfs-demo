/* src/App.js */
import './App.css'
import { useState } from 'react'
import { create } from 'ipfs-http-client'
import { Buffer } from 'buffer';
import { LoadingOutlined } from '@ant-design/icons';

const projectId = '2DphoghyzT7lZaGIMOZlUg5WPAc';   // <---------- your Infura Project ID
const projectSecret = 'f92b4fa55b72867e0eb1257c513f16c6';  // <---------- your Infura Secret

const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});

function App() {
  const [fileUrl, updateFileUrl] = useState(``)
  const [loading, setLoading] = useState(false)
  const [path, setPath] = useState('')
  
  async function onChange(e) {
    const file = e.target.files[0]
    setLoading(true)
    try {
      const added = await client.add(file)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      setPath(added.path)
      updateFileUrl(url)
      setLoading(false)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

  return (
    <div className="App">
      <h1>IPFS DEMO</h1>
      <h2>hash (CID) : {path}</h2>
      <a href={`https://ipfs.infura.io/ipfs/${path}`} target="_blank" >link</a>
      <p />
      <input
        type="file"
        onChange={onChange}
      />
      {
        loading && 
        <LoadingOutlined style={{ fontSize: 50 }} spin />
      }
      {
        fileUrl && (
          <img src={fileUrl} width="600px" />
        )
      }
    </div>
  );
}

export default App