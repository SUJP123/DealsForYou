import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BACKEND_API = "http://localhost:8080";

const initialState = {
    bought : [],
    cart : [],
    status: 'idle',
    error: null
}


