# Task Management Tool (Django Version)

A full-stack task management application with a Django REST framework backend and NextJS frontend.

## Features

- Create, read, update, and delete tasks
- Mark tasks as completed
- RESTful API 
- Comprehensive test suite
- Docker support for easy deployment

## Tech Stack

### Backend
- Django
- Django REST Framework
- PostgreSQL (Docker) 
- Django CORS Headers

### Frontend
- NextJS 15
- TypeScript
- Axios

## Running the Application

### Using Docker (Recommended)

1. Make sure you have Docker and Docker Compose installed on your system.
2. Clone this repository.
3. Navigate to the project root directory.
4. Run the following command:

```bash
docker-compose up --build
```

5. Access the application at http://localhost:3000

### Manual Setup

#### Backend

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create and activate a virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the Django application:
```bash
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

5. The backend API will be available at http://localhost:8000/api/

#### Frontend

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Access the frontend at http://localhost:3000

## API Endpoints

- `GET /api/tasks/`: Retrieve a list of all tasks
- `POST /api/tasks/`: Create a new task
- `GET /api/tasks/<id>/`: Retrieve a specific task
- `PUT /api/tasks/<id>/`: Update an existing task
- `PATCH /api/tasks/<id>/`: Partially update an existing task
- `DELETE /api/tasks/<id>/`: Delete a task

## Task Data Model

- `id`: Unique identifier for the task
- `title`: Title of the task
- `description`: Description of the task
- `completed`: Boolean indicating if the task is completed
- `created_at`: Timestamp when the task was created
- `updated_at`: Timestamp when the task was last updated

## Environment Variables

### Backend (.env)
- `DEBUG`: Enable/disable debug mode
- `SECRET_KEY`: Django secret key
- `DATABASE_NAME`: PostgreSQL database name
- `DATABASE_USER`: PostgreSQL username
- `DATABASE_PASSWORD`: PostgreSQL password
- `DATABASE_HOST`: PostgreSQL host
- `DATABASE_PORT`: PostgreSQL port
- `ALLOWED_HOSTS`: Comma-separated list of allowed hosts
- `CORS_ALLOWED_ORIGINS`: Comma-separated list of allowed CORS origins

### Frontend (.front.env)
- `NEXT_PUBLIC_API_URL`: URL of the backend API

## Testing

To run the backend tests: excute this command inside the container

```bash
pytest
```

## Project Structure

```
task_manager/
├── backend/
│   ├── task_mgmt_back/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── ...
│   ├── task/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── tests.py
│   │   └── urls.py
|   |   └── ...
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx
│   │   │   └── task/[id]/page.tsx
│   │   ├── components/
│   │   │   ├── TaskList.tsx
│   │   │   └── TaskForm.tsx
│   │   └── services/
│   │       └── ApiService.ts
│   ├── .env
│   └── Dockerfile
├── docker-compose.yml
├── .env
└── .front.dev
```
