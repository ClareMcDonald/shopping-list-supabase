
const SUPABASE_URL = 'https://tukthurmmqtwaehiiito.supabase.co';

const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTUxMjQ4NiwiZXhwIjoxOTU3MDg4NDg2fQ.dcEP-fg0vpKeFjfzcqeIW6Xx-SP3RtEStnjosGKZrac';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getItems() {
    const response = await client
        .from('list')
        .select();
    
    return checkError(response);
}

export async function createItem(quantity, item) {
    const response = await client
        .from('list')
        .insert([{ quantity, item }]);
    
    return checkError(response);
}

export async function buyItem(id) {
    const response = await client
        .from('list')
        .update({ bought: true })
        .match({ id: id });
    
    return checkError(response);
}

export async function deleteAllItems() {
    const response = await client
        .from('list')
        .delete();
    
    return checkError(response);
}

export async function getUser() {
    return client.auth.session();
}

export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./list');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });
    
    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '../';
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
