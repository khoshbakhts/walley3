
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Loader2, Send, ArrowRight, Image as ImageIcon } from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { PAINTING_NFT_ABI } from '../contracts/paintingNFTAbi';
import { PAINTING_SHARES_ABI } from '../contracts/paintingSharesAbi';

const PAINTING_NFT_ADDRESS = "0xa0704674d4174773f6b7ADcA2a6e3CafA5892DBc";
const PAINTING_SHARES_ADDRESS = "0x8bEacf1DB7e487b5AC66918327305E4aab2b7C91";

interface PaintingData {
  id: number;
  wallId: number;
  painter: string;
  description: string;
  sharesMinted: boolean;
  createdAt: number;
}

interface TokenInfo {
  paintingId: number;
  name: string;
  symbol: string;
  totalSupply: number;
  balance: number;
}

const AssetsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [tokens, setTokens] = useState<TokenInfo[]>([]);
  const [selectedToken, setSelectedToken] = useState<TokenInfo | null>(null);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokens = async () => {
      if (!window.ethereum?.selectedAddress) return;

      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        
        const paintingNFTContract = new ethers.Contract(
          PAINTING_NFT_ADDRESS,
          PAINTING_NFT_ABI,
          signer
        );
        
        const paintingSharesContract = new ethers.Contract(
          PAINTING_SHARES_ADDRESS,
          PAINTING_SHARES_ABI,
          signer
        );

        // Fetch all paintings
        const tokenInfos: TokenInfo[] = [];
        let paintingId = 1;
        
        while (true) {
          try {
            const painting = await paintingNFTContract.paintings(paintingId);
            
            if (!painting || painting.painter === ethers.ZeroAddress) {
              break;
            }

            // Get share info and balance
            const shareInfo = await paintingSharesContract.getShareInfo(paintingId);
            const balance = await paintingSharesContract.balanceOf(
              window.ethereum.selectedAddress,
              paintingId
            );

            if (Number(balance) > 0) {
              tokenInfos.push({
                paintingId,
                name: shareInfo.name,
                symbol: shareInfo.symbol,
                totalSupply: Number(shareInfo.totalSupply),
                balance: Number(balance)
              });
            }

            paintingId++;
          } catch (error) {
            console.error(`Error fetching painting ${paintingId}:`, error);
            break;
          }
        }

        setTokens(tokenInfos);
      } catch (error) {
        console.error('Error fetching tokens:', error);
        setError('Failed to load tokens. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  const handleSendToken = async () => {
    if (!selectedToken || !recipientAddress || !sendAmount) return;

    try {
      setSending(true);
      setError(null);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      const paintingSharesContract = new ethers.Contract(
        PAINTING_SHARES_ADDRESS,
        PAINTING_SHARES_ABI,
        signer
      );

      const tx = await paintingSharesContract.transfer(
        selectedToken.paintingId,
        recipientAddress,
        ethers.parseUnits(sendAmount, 0)
      );

      await tx.wait();

      // Refresh token balances
      const newBalance = await paintingSharesContract.balanceOf(
        window.ethereum.selectedAddress,
        selectedToken.paintingId
      );

      setTokens(tokens.map(token => 
        token.paintingId === selectedToken.paintingId 
          ? { ...token, balance: Number(newBalance) }
          : token
      ));

      setSelectedToken(null);
      setRecipientAddress('');
      setSendAmount('');
    } catch (error) {
      console.error('Error sending tokens:', error);
      setError('Failed to send tokens. Please try again.');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex items-center space-x-2 text-gold-light">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Loading your tokens...</span>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">My Assets</h1>
          <div className="text-gray-400">
            Total Tokens: {tokens.reduce((acc, token) => acc + token.balance, 0)}
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-500">
            {error}
          </div>
        )}

        {tokens.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {tokens.map((token) => (
              <div 
                key={token.paintingId}
                className="bg-dark-lighter rounded-lg overflow-hidden border border-gold-light/10 hover:border-gold-light/30 transition-colors"
              >
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">{token.name}</h3>
                      <div className="flex items-center text-gray-400">
                        <ImageIcon className="w-4 h-4 mr-2" />
                        <span>Painting #{token.paintingId}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gold-light">
                        {token.balance.toLocaleString()} {token.symbol}
                      </div>
                      <div className="text-sm text-gray-400">
                        of {token.totalSupply.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="w-full bg-dark rounded-full h-2 mt-4">
                    <div
                      className="bg-gradient-to-r from-gold-light to-gold-dark h-2 rounded-full"
                      style={{ width: `${(token.balance / token.totalSupply) * 100}%` }}
                    />
                  </div>

                  <button
                    onClick={() => setSelectedToken(token)}
                    className="w-full mt-4 px-4 py-2 bg-gold-light/10 text-gold-light rounded-lg hover:bg-gold-light/20 transition-colors flex items-center justify-center"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Tokens
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400">
            You don't have any tokens yet.
          </div>
        )}

        {selectedToken && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-dark-lighter rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold text-white mb-6">
                Send {selectedToken.symbol} Tokens
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300">Recipient Address</label>
                  <input
                    type="text"
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    className="mt-1 block w-full rounded-lg bg-dark border border-gold-light/20 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold-light"
                    placeholder="0x..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300">Amount</label>
                  <div className="mt-1 flex rounded-lg shadow-sm">
                    <input
                      type="number"
                      value={sendAmount}
                      onChange={(e) => setSendAmount(e.target.value)}
                      max={selectedToken.balance}
                      className="block w-full rounded-lg bg-dark border border-gold-light/20 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold-light"
                      placeholder="Amount"
                    />
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setSelectedToken(null)}
                    className="flex-1 px-4 py-2 bg-dark text-gray-400 rounded-lg hover:bg-dark-light transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendToken}
                    disabled={sending || !recipientAddress || !sendAmount || Number(sendAmount) > selectedToken.balance}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-gold-light to-gold-dark text-dark font-semibold rounded-lg hover:from-gold-dark hover:to-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {sending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Send
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AssetsPage;