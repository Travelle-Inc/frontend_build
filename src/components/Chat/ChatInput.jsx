import React, { useState, useRef, useEffect } from 'react';
import { Plus, Send, Mic, Image as ImageIcon, Video, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './ChatInput.css';

const ChatInput = ({ onChatStart }) => {
    const { user, isAuthenticated } = useAuth();
    const [inputValue, setInputValue] = useState('');
    const [showPlusMenu, setShowPlusMenu] = useState(false);
    const [mediaPreview, setMediaPreview] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);
    const videoInputRef = useRef(null);
    const plusMenuRef = useRef(null);

    // Generate dynamic placeholder text
    const getPlaceholderText = () => {
        if (isAuthenticated && user?.name) {
            const firstName = user.name.split(' ')[0];
            return `Hey ${firstName}, I'm Journii Your Personal Concierge... How can I help you today?`;
        }
        return "Hello, I'm Journii Your Personal Concierge... How can I help you today?";
    };

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
        }
    }, [inputValue]);

    // Close plus menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (plusMenuRef.current && !plusMenuRef.current.contains(event.target)) {
                setShowPlusMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSend = () => {
        if (inputValue.trim() || mediaPreview.length > 0) {
            if (onChatStart) onChatStart();
            setInputValue('');
            setMediaPreview([]);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handlePaste = async (e) => {
        const items = e.clipboardData?.items;
        if (!items) return;

        for (let item of items) {
            if (item.type.indexOf('image') !== -1) {
                e.preventDefault();
                const file = item.getAsFile();
                addMediaPreview(file, 'image');
            } else if (item.type.indexOf('video') !== -1) {
                e.preventDefault();
                const file = item.getAsFile();
                addMediaPreview(file, 'video');
            }
        }

        // Check for URLs
        const text = e.clipboardData?.getData('text');
        if (text && isURL(text)) {
            const preview = await generateLinkPreview(text);
            if (preview) {
                setMediaPreview(prev => [...prev, preview]);
            }
        }
    };

    const isURL = (str) => {
        try {
            new URL(str);
            return true;
        } catch {
            return false;
        }
    };

    const generateLinkPreview = async (url) => {
        // Detect platform and media type
        const platform = detectPlatform(url);
        const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(url) ||
                       platform === 'youtube' || platform === 'tiktok' || platform === 'instagram';

        return {
            type: 'link',
            url,
            platform,
            isVideo,
            thumbnail: getDefaultThumbnail(platform)
        };
    };

    const detectPlatform = (url) => {
        if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
        if (url.includes('tiktok.com')) return 'tiktok';
        if (url.includes('instagram.com')) return 'instagram';
        if (url.includes('vimeo.com')) return 'vimeo';
        return null;
    };

    const getDefaultThumbnail = (platform) => {
        const thumbnails = {
            youtube: 'https://www.youtube.com/favicon.ico',
            tiktok: 'https://www.tiktok.com/favicon.ico',
            instagram: 'https://www.instagram.com/favicon.ico',
            vimeo: 'https://vimeo.com/favicon.ico'
        };
        return thumbnails[platform] || null;
    };

    const addMediaPreview = (file, type) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setMediaPreview(prev => [...prev, {
                type,
                url: e.target.result,
                name: file.name
            }]);
        };
        reader.readAsDataURL(file);
    };

    const handleFileSelect = (type) => {
        if (type === 'image') {
            fileInputRef.current?.click();
        } else if (type === 'video') {
            videoInputRef.current?.click();
        }
        setShowPlusMenu(false);
    };

    const handleFileChange = (e, type) => {
        const file = e.target.files?.[0];
        if (file) {
            addMediaPreview(file, type);
        }
    };

    const removePreview = (index) => {
        setMediaPreview(prev => prev.filter((_, i) => i !== index));
    };

    const toggleVoiceRecording = () => {
        setIsRecording(!isRecording);
        // TODO: Implement actual voice recording
    };

    return (
        <div className="modern-chat-input-container">
            {/* Media Previews */}
            {mediaPreview.length > 0 && (
                <div className="media-preview-container">
                    {mediaPreview.map((media, index) => (
                        <div key={index} className="media-preview-item">
                            {media.type === 'image' && (
                                <img src={media.url} alt="Preview" />
                            )}
                            {media.type === 'video' && (
                                <div className="video-preview">
                                    <Video size={24} />
                                    <span>{media.name}</span>
                                </div>
                            )}
                            {media.type === 'link' && (
                                <div className="link-preview">
                                    {media.platform && (
                                        <div className="platform-badge">{media.platform}</div>
                                    )}
                                    <div className="link-thumbnail">
                                        {media.isVideo && <Video size={20} />}
                                        <span>{new URL(media.url).hostname}</span>
                                    </div>
                                </div>
                            )}
                            <button className="remove-preview-btn" onClick={() => removePreview(index)}>
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Main Input Bar */}
            <div className="chat-input-bar">
                {/* Plus Button with Menu */}
                <div className="plus-button-container" ref={plusMenuRef}>
                    <button
                        className="plus-btn"
                        onClick={() => setShowPlusMenu(!showPlusMenu)}
                        title="Add media"
                    >
                        <Plus size={20} />
                    </button>

                    {showPlusMenu && (
                        <div className="plus-menu">
                            <button onClick={() => handleFileSelect('image')}>
                                <ImageIcon size={18} />
                                <span>Upload Image</span>
                            </button>
                            <button onClick={() => handleFileSelect('video')}>
                                <Video size={18} />
                                <span>Upload Video</span>
                            </button>
                        </div>
                    )}
                </div>

                {/* Expandable Text Input */}
                <textarea
                    ref={textareaRef}
                    placeholder={getPlaceholderText()}
                    className="chat-input-field"
                    rows={1}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onPaste={handlePaste}
                />

                {/* Action Buttons */}
                <div className="input-actions">
                    {inputValue.trim() ? (
                        <button className="send-btn-modern" onClick={handleSend}>
                            <Send size={18} />
                        </button>
                    ) : (
                        <button
                            className={`voice-btn-modern ${isRecording ? 'recording' : ''}`}
                            onClick={toggleVoiceRecording}
                            title={isRecording ? "Stop recording" : "Voice input"}
                        >
                            <Mic size={18} />
                        </button>
                    )}
                </div>
            </div>

            {/* Hidden File Inputs */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => handleFileChange(e, 'image')}
            />
            <input
                ref={videoInputRef}
                type="file"
                accept="video/*"
                style={{ display: 'none' }}
                onChange={(e) => handleFileChange(e, 'video')}
            />
        </div>
    );
};

export default ChatInput;

