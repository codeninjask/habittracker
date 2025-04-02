function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(() => {
      document.getElementById('loginSection').style.display = 'none';
      document.getElementById('app').style.display = 'block';
      loadHabits();
    });
  }
  
  function addHabit() {
    const habitInput = document.getElementById('habitInput');
    const habit = habitInput.value.trim();
    if (habit) {
      db.collection('habits').add({
        text: habit,
        userId: auth.currentUser.uid,
        date: new Date()
      });
      habitInput.value = '';
    }
  }
  
  function loadHabits() {
    db.collection('habits')
      .where('userId', '==', auth.currentUser.uid)
      .orderBy('date', 'desc')
      .onSnapshot(snapshot => {
        const habitList = document.getElementById('habitList');
        habitList.innerHTML = '';
        snapshot.forEach(doc => {
          const habit = doc.data().text;
          const li = document.createElement('li');
          li.textContent = habit;
          habitList.appendChild(li);
        });
      });
  }
  
  // Check if user is already logged in
  auth.onAuthStateChanged(user => {
    if (user) {
      document.getElementById('loginSection').style.display = 'none';
      document.getElementById('app').style.display = 'block';
      loadHabits();
    }
  });