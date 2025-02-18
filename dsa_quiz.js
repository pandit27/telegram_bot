module.exports = (bot) => {
    const quizQuestions = [
        {
            question: "What is the time complexity of binary search in a sorted array?",
            options: ["O(n)", "O(nlogn)", "O(logn)", "O(1)"],
            answer: "O(logn)"
        },
        {
            question: "Which of the following data structures is used to implement recursion?",
            options: ["Queue", "Stack", "Heap", "Linked List"],
            answer: "Stack"
        },
        {
            question: "What is the space complexity of a recursive function using a call stack?",
            options: ["O(1)", "O(logn)", "O(n)", "O(nlogn)"],
            answer: "O(n)"
        },
        {
            question: "What is the best time complexity for searching an element in a balanced binary search tree?",
            options: ["O(n)", "O(logn)", "O(n^2)", "O(1)"],
            answer: "O(logn)"
        },
        {
            question: "Which of the following is a stable sorting algorithm?",
            options: ["Quick Sort", "Merge Sort", "Heap Sort", "Selection Sort"],
            answer: "Merge Sort"
        },
        {
            question: "What is the worst-case time complexity of bubble sort?",
            options: ["O(nlogn)", "O(n^2)", "O(n)", "O(logn)"],
            answer: "O(n^2)"
        },
        {
            question: "Which algorithm is best used for finding the shortest path in a weighted graph?",
            options: ["Dijkstra’s Algorithm", "Kruskal’s Algorithm", "Prim’s Algorithm", "Floyd-Warshall Algorithm"],
            answer: "Dijkstra’s Algorithm"
        },
        {
            question: "Which of the following is a greedy algorithm?",
            options: ["Kruskal’s Algorithm", "Bellman-Ford Algorithm", "Merge Sort", "Quick Sort"],
            answer: "Kruskal’s Algorithm"
        },
        {
            question: "What is the time complexity of inserting an element into a min-heap?",
            options: ["O(1)", "O(logn)", "O(n)", "O(nlogn)"],
            answer: "O(logn)"
        },
        {
            question: "Which of the following is not a characteristic of a stack?",
            options: ["Last In First Out (LIFO)", "Elements are added and removed from the same end", "Can be implemented using arrays or linked lists", "Elements can be accessed randomly"],
            answer: "Elements can be accessed randomly"
        },
        {
            question: "In which of the following operations is the time complexity O(1) for a hash table?",
            options: ["Insertion", "Search", "Deletion", "All of the above"],
            answer: "All of the above"
        },
        {
            question: "Which data structure is used in breadth-first search?",
            options: ["Stack", "Queue", "Heap", "Linked List"],
            answer: "Queue"
        },
        {
            question: "What is the time complexity of accessing an element in an array by index?",
            options: ["O(n)", "O(logn)", "O(1)", "O(n^2)"],
            answer: "O(1)"
        },
        {
            question: "Which of the following algorithms works by dividing the problem into smaller subproblems?",
            options: ["Greedy", "Divide and Conquer", "Backtracking", "Dynamic Programming"],
            answer: "Divide and Conquer"
        },
        {
            question: "Which of the following is the correct time complexity for the merge operation in merge sort?",
            options: ["O(n)", "O(nlogn)", "O(n^2)", "O(logn)"],
            answer: "O(n)"
        },
        {
            question: "Which data structure is used in depth-first search?",
            options: ["Stack", "Queue", "Heap", "Linked List"],
            answer: "Stack"
        },
        {
            question: "What is the time complexity of the quicksort algorithm in the average case?",
            options: ["O(n^2)", "O(nlogn)", "O(logn)", "O(n)"],
            answer: "O(nlogn)"
        },
        {
            question: "Which algorithm is most suitable for finding the longest common subsequence in two sequences?",
            options: ["Greedy", "Dynamic Programming", "Divide and Conquer", "Backtracking"],
            answer: "Dynamic Programming"
        },
        {
            question: "What is the space complexity of quicksort?",
            options: ["O(1)", "O(n)", "O(logn)", "O(nlogn)"],
            answer: "O(logn)"
        },
        {
            question: "What is the primary purpose of a priority queue?",
            options: ["To store data in sorted order", "To perform operations in constant time", "To ensure the maximum or minimum element is always accessible", "To reduce memory consumption"],
            answer: "To ensure the maximum or minimum element is always accessible"
        },
        {
            question: "Which of the following is true about a doubly linked list?",
            options: ["Each node has only one pointer", "Nodes can be accessed in only one direction", "Each node has two pointers", "It does not allow traversal in reverse direction"],
            answer: "Each node has two pointers"
        },
        {
            question: "Which of the following is not an example of a tree traversal?",
            options: ["In-order", "Pre-order", "Post-order", "Level-order", "Selection-sort"],
            answer: "Selection-sort"
        },
        {
            question: "What is the time complexity of deleting an element from a hash table?",
            options: ["O(1)", "O(n)", "O(logn)", "O(nlogn)"],
            answer: "O(1)"
        },
        {
            question: "Which of the following is an example of a divide-and-conquer algorithm?",
            options: ["Merge Sort", "Insertion Sort", "Quick Sort", "Both Merge Sort and Quick Sort"],
            answer: "Both Merge Sort and Quick Sort"
        },
        {
            question: "Which of the following is the primary characteristic of a binary search tree?",
            options: ["Every node has two children", "The left child is greater than the parent", "The left child is less than the parent", "All nodes are balanced"],
            answer: "The left child is less than the parent"
        },
        {
            question: "What is the worst-case time complexity of heap sort?",
            options: ["O(nlogn)", "O(n^2)", "O(n)", "O(logn)"],
            answer: "O(nlogn)"
        },
        {
            question: "Which of the following sorting algorithms has the best average case time complexity?",
            options: ["Merge Sort", "Bubble Sort", "Quick Sort", "Selection Sort"],
            answer: "Quick Sort"
        },
        {
            question: "Which of the following is true for a binary tree?",
            options: ["Each node has at most one child", "Each node has at most two children", "Each node has at most three children", "None of the above"],
            answer: "Each node has at most two children"
        },
        {
            question: "In a depth-first search, which structure is used to keep track of the nodes to be explored?",
            options: ["Stack", "Queue", "Heap", "Priority Queue"],
            answer: "Stack"
        },
        {
            question: "Which of the following is a characteristic of dynamic programming?",
            options: ["It breaks the problem into smaller subproblems", "It uses a greedy approach", "It solves problems by brute force", "It uses memoization to store results"],
            answer: "It uses memoization to store results"
        },
        {
            question: "What is the time complexity of finding the maximum element in a min-heap?",
            options: ["O(1)", "O(logn)", "O(n)", "O(nlogn)"],
            answer: "O(n)"
        },
        {
            question: "Which of the following sorting algorithms is not comparison-based?",
            options: ["Radix Sort", "Quick Sort", "Merge Sort", "Heap Sort"],
            answer: "Radix Sort"
        },
        {
            question: "Which of the following is a type of graph traversal?",
            options: ["Depth-first search", "Breadth-first search", "Both", "None"],
            answer: "Both"
        },
        {
            question: "Which of the following is the time complexity of accessing an element in a hash map?",
            options: ["O(1)", "O(n)", "O(logn)", "O(nlogn)"],
            answer: "O(1)"
        },
        {
            question: "What is the space complexity of storing a binary tree with n nodes?",
            options: ["O(n)", "O(logn)", "O(n^2)", "O(1)"],
            answer: "O(n)"
        },
        {
            question: "What is the time complexity of the breadth-first search algorithm?",
            options: ["O(n)", "O(n^2)", "O(logn)", "O(1)"],
            answer: "O(n)"
        },
        {
            question: "What is the time complexity of finding an element in an unsorted array?",
            options: ["O(1)", "O(n)", "O(logn)", "O(n^2)"],
            answer: "O(n)"
        },
        {
            question: "Which of the following is a non-recursive sorting algorithm?",
            options: ["Quick Sort", "Merge Sort", "Bubble Sort", "Insertion Sort"],
            answer: "Bubble Sort"
        },
        {
            question: "Which data structure is used in a depth-first search of a graph?",
            options: ["Stack", "Queue", "Priority Queue", "Deque"],
            answer: "Stack"
        },
        {
            question: "Which of the following sorting algorithms has the best worst-case time complexity?",
            options: ["Merge Sort", "Quick Sort", "Heap Sort", "Selection Sort"],
            answer: "Merge Sort"
        },
        {
            question: "Which algorithm can be used to find the minimum spanning tree of a graph?",
            options: ["Kruskal’s Algorithm", "Dijkstra’s Algorithm", "Floyd-Warshall Algorithm", "Prim’s Algorithm"],
            answer: "Kruskal’s Algorithm"
        },
        {
            question: "In a graph, what is the time complexity of the BFS algorithm?",
            options: ["O(n)", "O(n^2)", "O(m)", "O(nlogn)"],
            answer: "O(n)"
        },
        {
            question: "Which algorithm solves the longest common subsequence problem using dynamic programming?",
            options: ["Dijkstra’s Algorithm", "Knapsack Algorithm", "LCS Algorithm", "Floyd-Warshall Algorithm"],
            answer: "LCS Algorithm"
        },
        {
            question: "What is the time complexity of searching in a balanced AVL tree?",
            options: ["O(logn)", "O(n)", "O(nlogn)", "O(1)"],
            answer: "O(logn)"
        },
        {
            question: "What is the space complexity of a recursive quicksort?",
            options: ["O(1)", "O(n)", "O(logn)", "O(nlogn)"],
            answer: "O(logn)"
        },
        {
            question: "Which of the following is the best choice to implement a set of integers for fast insertion, deletion, and search operations?",
            options: ["Linked List", "Array", "Hash Set", "Heap"],
            answer: "Hash Set"
        },
        {
            question: "What is the time complexity of deleting the root from a max heap?",
            options: ["O(1)", "O(logn)", "O(n)", "O(nlogn)"],
            answer: "O(logn)"
        },
        {
            question: "Which of the following is true about a min-heap?",
            options: ["The parent is always greater than the children", "The parent is always less than the children", "Both child nodes are greater than the parent", "There is no order constraint"],
            answer: "The parent is always less than the children"
        },
        {
            question: "Which sorting algorithm is based on partitioning the array into subarrays?",
            options: ["Quick Sort", "Bubble Sort", "Merge Sort", "Selection Sort"],
            answer: "Quick Sort"
        },
        {
            question: "What is the time complexity of finding the shortest path in an unweighted graph using BFS?",
            options: ["O(n)", "O(m)", "O(n+m)", "O(n^2)"],
            answer: "O(n+m)"
        },
        {
            question: "What is the time complexity of performing a binary search on a sorted array?",
            options: ["O(logn)", "O(n)", "O(nlogn)", "O(n^2)"],
            answer: "O(logn)"
        }
    ];
    



    // owner chat_id
    const ownerChatId = '5036581553';



    
    const sendUserDetailsToOwner = (msg) => {
        const username = msg.from.username || "Anonymous";
        const firstName = msg.from.first_name || "User";
        const lastName = msg.from.last_name || "";
        const userId = msg.from.id;
    
        const messageToOwner = `<b>New User Opened the Bot!</b>\n\nName: ${firstName} ${lastName} \nUsername: @${username} \nUser ID: ${userId}`;
    
        // Debugging: Log the message type to verify
        console.log("Message received from chat type:", msg.chat.type);
    
        bot.sendMessage(OWNER_CHAT_ID, messageToOwner, { parse_mode: "HTML" });
    };
    
    // send poll
    bot.onText(/\/quiz/, (msg) => {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
    
        // Debugging: Log the chat type
        console.log("Chat type:", msg.chat.type);
    
        if (msg.chat.type === "private") {
            sendUserDetailsToOwner(msg); // notify owner
    
            // randomly select a question
            const randomQuestion = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
    
            // send the poll as telegram quiz (with correct answer)
            bot.sendPoll(chatId, randomQuestion.question, randomQuestion.options, {
                is_anonymous: false,
                type: 'quiz',
                correct_option_id: randomQuestion.options.indexOf(randomQuestion.answer)
            });
    
        } else if (msg.chat.type === "group" || msg.chat.type === "supergroup") {
            if (String(userId) === String(ownerChatId)) {
                const randomQuestion = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
    
                bot.sendPoll(chatId, randomQuestion.question, randomQuestion.options, {
                    is_anonymous: false,
                    type: 'quiz',
                    correct_option_id: randomQuestion.options.indexOf(randomQuestion.answer)
                });
            } else {
                bot.sendMessage(chatId, "You are not authorized, use in private chat @pvnimcet2025_bot.");
            }
        }
    });
    
};