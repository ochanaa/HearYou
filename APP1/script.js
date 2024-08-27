document.addEventListener('DOMContentLoaded', function() {
    const sections = {
        home: document.getElementById('home-section'),
        history: document.getElementById('history-section'),
        settings: document.getElementById('settings-section')
    };

    const buttons = {
        home: document.getElementById('home-btn'),
        history: document.getElementById('history-btn'),
        settings: document.getElementById('settings-btn')
    };

    Object.keys(buttons).forEach(function(key) {
        buttons[key].addEventListener('click', function() {
            // Hide all sections
            Object.values(sections).forEach(section => section.classList.remove('active'));

            // Remove active class from all buttons
            Object.values(buttons).forEach(button => button.classList.remove('active'));

            // Show the clicked section and highlight the clicked button
            sections[key].classList.add('active');
            buttons[key].classList.add('active');
        });
    });

    // Set initial view
    sections.home.classList.add('active');
    buttons.home.classList.add('active');

    // Implementing the recording feature
    const recordButton = document.getElementById('record-button');
    let mediaRecorder;
    let audioChunks = [];

    recordButton.addEventListener('click', async function() {
        if (!mediaRecorder || mediaRecorder.state === "inactive") {
            // Start recording
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = event => {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                audioChunks = [];
                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);
                audio.play();

                // Simulate summarization (replace with actual implementation)
                alert("Summarizing the recording...");
                // Here you would send audioBlob to the server for summarization
            };

            mediaRecorder.start();
            recordButton.textContent = "🛑 Stop Recording";
        } else {
            // Stop recording
            mediaRecorder.stop();
            recordButton.textContent = "🎤 Start Recording";
        }
    });

    // Implementing the upload feature
    const uploadFileInput = document.getElementById('upload-file');
    const summarizeButton = document.getElementById('summarize-button');

    uploadFileInput.addEventListener('change', function() {
        if (uploadFileInput.files.length > 0) {
            const file = uploadFileInput.files[0];
            const audioUrl = URL.createObjectURL(file);
            const audio = new Audio(audioUrl);
            audio.play();

            // Simulate summarization (replace with actual implementation)
            alert("Summarizing the uploaded audio...");
            // Here you would send the file to the server for summarization
        }
    });

    summarizeButton.addEventListener('click', function() {
        if (!mediaRecorder || mediaRecorder.state === "inactive") {
            alert("No recording in progress. Please upload a file or start a recording.");
        } else {
            // Simulate summarization of current recording
            alert("Summarizing the current recording...");
            mediaRecorder.stop();
        }
    });
});
