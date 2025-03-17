import React, { useRef } from 'react';

const ProfilePage = () => {
    const usernameRef = useRef('');
    const emailRef = useRef('');
    const phoneRef = useRef('');
    const passwordRef = useRef('');
    const profileImageRef = useRef('default-avatar.png');
    const profileImageElement = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profileImageRef.current = e.target.result;
                if (profileImageElement.current) {
                    profileImageElement.current.src = e.target.result;
                }
            };
            reader.readAsDataURL(file);
        }
    };

    // Save data
    const handleSave = () => {
        const userData = {
            username: usernameRef.current.value,
            email: emailRef.current.value,
            phone: phoneRef.current.value,
            password: passwordRef.current.value,
            profileImage: profileImageRef.current
        };
        console.log('Profile Updated:', userData);
        alert('Profile Updated!');
    };

    // Inline CSS Styles
    const styles = {
        container: {
            width: '60%',
            backgroundColor: 'white',
            overflowY: 'auto',
            padding: '20px'
        },
        header: {
            backgroundColor: '#07b441',
            textAlign: 'center',
            padding: '30px 20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px'
        },
        profileHeaderContainer: {
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            backgroundColor: 'white',
            border: '3px solid black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        profileImage: {
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            objectFit: 'cover'
        },
        profilePictureText: {
            color: 'black',
            fontWeight: 'bold',
            fontSize: '16px'
        },
        formSection: {
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            padding: '50px'
        },
        input: {
            width: '90%',
            padding: '10px',
            margin: '0 auto 30px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            outline: 'none'
        },
        updateBtn: {
            width: '100%',
            padding: '12px',
            backgroundColor: 'rgb(11, 78, 11)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.3s'
        },
        updateBtnHover: {
            backgroundColor: '#333'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div style={styles.profileHeaderContainer}>
                    <img
                        ref={profileImageElement}
                        src={profileImageRef.current}
                        alt="Profile"
                        style={styles.profileImage}
                    />
                    {profileImageRef.current === 'default-avatar.png' && (
                        <div style={styles.profilePictureText}>
                            Insert Profile Picture
                        </div>
                    )}
                </div>

                <input
                    type="file"
                    id="imageUpload"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                />
                <p
                    style={{ color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                    onClick={() => document.getElementById('imageUpload').click()}
                >
                    Change Picture
                </p>
            </div>

            <div style={styles.formSection}>
                <input
                    ref={usernameRef}
                    type="text"
                    placeholder="name"
                    style={styles.input}
                />
                <input
                    ref={emailRef}
                    type="email"
                    placeholder="Email"
                    style={styles.input}
                />
                <input
                    ref={phoneRef}
                    type="text"
                    placeholder="Phone Number"
                    style={styles.input}
                />
                <input
                    ref={passwordRef}
                    type="password"
                    placeholder="Password"
                    style={styles.input}
                />
                <button
                    style={styles.updateBtn}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = '#333')}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = 'rgb(11, 78, 11)')}
                    onClick={handleSave}
                >
                    Update
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;
