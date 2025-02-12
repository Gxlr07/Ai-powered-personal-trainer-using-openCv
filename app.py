import cv2
import os
import argparse
import mediapipe as mp
from utils import *
from body_part_angle import BodyPartAngle
from types_of_exercise import TypeOfExercise

# Parse command-line arguments
ap = argparse.ArgumentParser()
ap.add_argument("-t", "--exercise_type", type=str, help="Type of activity to do", required=True)
ap.add_argument("-vs", "--video_source", type=str, help="Video file name (optional)", required=False)
args = vars(ap.parse_args())

mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose

# Set video source (file or webcam)
if args["video_source"] is not None:
    video_path = os.path.join("Exercise Videos", args["video_source"])
    
    # Check if the file exists
    if not os.path.exists(video_path):
        print(f"Error: Video file '{args['video_source']}' not found in 'Exercise Videos/' folder.")
        exit()

    cap = cv2.VideoCapture(video_path)
else:
    cap = cv2.VideoCapture(0)  # Use webcam if no video file is provided

# Check if video capture opened successfully
if not cap.isOpened():
    print("Error: Could not open video source. Check file path or webcam.")
    exit()

cap.set(3, 800)  # Width
cap.set(4, 480)  # Height

# OpenCV window setup
cv2.namedWindow("Video", cv2.WINDOW_NORMAL)

# Setup MediaPipe Pose
with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
    counter = 0  # Movement of exercise
    status = True  # State of move

    while cap.isOpened():
        ret, frame = cap.read()

        # Check if frame was read successfully
        if not ret:
            print("Error: Could not read frame. Ending program.")
            break

        # Resize frame to ensure consistent size
        frame = cv2.resize(frame, (800, 480), interpolation=cv2.INTER_AREA)

        # Convert frame to RGB for MediaPipe
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        frame.flags.writeable = False

        # Pose detection
        results = pose.process(frame)

        # Convert frame back to BGR
        frame.flags.writeable = True
        frame = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)

        try:
            landmarks = results.pose_landmarks.landmark
            counter, status = TypeOfExercise(landmarks).calculate_exercise(args["exercise_type"], counter, status)
        except:
            pass

        # Display exercise score table
        frame = score_table(args["exercise_type"], frame, counter, status)

        # Render pose landmarks
        mp_drawing.draw_landmarks(
            frame, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
            mp_drawing.DrawingSpec(color=(255, 255, 255), thickness=2, circle_radius=2),
            mp_drawing.DrawingSpec(color=(174, 139, 45), thickness=2, circle_radius=2)
        )

        # Show the frame
        cv2.imshow("Video", frame)

        # Press 'q' to exit
        if cv2.waitKey(10) & 0xFF == ord('q'):
            break

# Release resources
cap.release()
cv2.destroyAllWindows()
