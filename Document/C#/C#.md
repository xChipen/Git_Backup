## 非同步

### Task

```c#
等待 10 秒. 方法不返回任何內容時，您可以使用 Task，而不是使用 void。
public static void Main(string[] args)
        {
            Console.WriteLine("Main Method Started......");
            SomeMethod();
            Console.WriteLine("Main Method End");
            Console.ReadKey();
        }
        public async static void SomeMethod()
        {
            Console.WriteLine("Some Method Started......");
            await Wait();
            Console.WriteLine("Some Method End");
        }
        private static async Task Wait()
        {
            await Task.Delay(TimeSpan.FromSeconds(10));
            Console.WriteLine("\n10 Seconds wait Completed\n");
        }
```

![image-20230824133944940](D:\Git_backup\Document\C#\Image\image-20230824133944940.png)

```C#
同步
        public static void Main(string[] args)
        {
            Console.WriteLine("Main Method Started......");
            SomeMethod();
            Console.WriteLine("Main Method End");
            Console.ReadKey();
        }
        public async static void SomeMethod()
        {
            Console.WriteLine("Some Method Started......");
            Wait();
            Console.WriteLine("Some Method End");
        }
        private static async void Wait()
        {
            await Task.Delay(TimeSpan.FromSeconds(10));
            Console.WriteLine("\n10 Seconds wait Completed\n");
        }
```

![image-20230824134047886](D:\Git_backup\Document\C#\Image\-20230824134047886.png)

---

### 取返回值

Server :

```C#
    public class GreetingsController : ApiController
    {
        //api/greetings/name
        [Route("api/greetings/{name}")]
        [HttpGet]
        public string GetGreetings(string name)
        {
            return $"Hello {name}, Welcome to Web API";
        }
    }
```

Client :

```c#
        public static void Main(string[] args)
        {
            Console.WriteLine("Main Method Started......");
            Console.WriteLine("Enter the Name: ");
            string Name = Console.ReadLine();
            SomeMethod(Name);
            Console.WriteLine("Main Method End");
            Console.ReadKey();
        }
        public async static void SomeMethod(string Name)
        {
            Console.WriteLine("Some Method Started......");
            try
            {
                // 不加入 await 不會收到例外
                var GreetingSMessage = await Greetings(Name);
                Console.WriteLine($"\n{GreetingSMessage}");
            }
            catch (HttpRequestException ex)
            {
                Console.WriteLine($"\nError Occurred. {ex.Message}");
            }
            Console.WriteLine("Some Method End");
        }
        
        public static async Task<string> Greetings(string Name)
        {
            string message = string.Empty;
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("http://localhost:58937/");
                
                HttpResponseMessage response = await client.GetAsync($"api/greetings/{Name}");
                response.EnsureSuccessStatusCode();  // 確認狀態200
                message = await response.Content.ReadAsStringAsync();
            }
            return message;
        }
```

---

### 傳遞複雜類型

```C#
using System;
using System.Threading.Tasks;
namespace TaskBasedAsynchronousProgramming
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine($"Main Thread Started");
            SomeMethod();
            Console.WriteLine($"Main Thread Completed");
            Console.ReadKey();
        }
        private async static void SomeMethod()
        {
            Employee emp = await GetEmployeeDetails();
            Console.WriteLine($"ID: {emp.ID}, Name : {emp.Name}, Salary : {emp.Salary}");
        }
        static async Task<Employee> GetEmployeeDetails()
        {
            Employee employee = new Employee()
            {
                ID = 101,
                Name = "James",
                Salary = 10000
            };
            return employee;
        }
    }
    public class Employee
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public double Salary { get; set; }
    }
}
```

---

### 多執行緒

```C#
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;
namespace AsynchronousProgramming
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine($"Main Thread Started");
            List<CreditCard> creditCards = CreditCard.GenerateCreditCards(10);
            Console.WriteLine($"Credit Card Generated : {creditCards.Count}");
           
            ProcessCreditCards(creditCards);
            
            Console.WriteLine($"Main Thread Completed");
            Console.ReadKey();
        }
        public static async void ProcessCreditCards(List<CreditCard> creditCards)
        {
            var stopwatch = new Stopwatch();
            stopwatch.Start();
            var tasks = new List<Task<string>>();
            //Processing the creditCards using foreach loop
            foreach (var creditCard in creditCards)
            {
                var response = ProcessCard(creditCard);
                tasks.Add(response);
            }
            //It will execute all the tasks concurrently
            await Task.WhenAll(tasks); // 等待全部執行完畢
            stopwatch.Stop();
            Console.WriteLine($"Processing of {creditCards.Count} Credit Cards Done in {stopwatch.ElapsedMilliseconds/1000.0} Seconds");
            //foreach(var item in tasks)
            //{
            //    Console.WriteLine(item.Result);
            //}
        }
//顯示卡片資料        
        public static async Task<string> ProcessCard(CreditCard creditCard)
        {
            //Here we can do any API Call to Process the Credit Card
            //But for simplicity we are just delaying the execution for 1 second
            await Task.Delay(1000);
            string message = $"Credit Card Number: {creditCard.CardNumber} Name: {creditCard.Name} Processed";
            Console.WriteLine($"Credit Card Number: {creditCard.CardNumber} Processed");
            return message;
        }
    }
//產生卡片資料    
    public class CreditCard
    {
        public string CardNumber { get; set; }
        public string Name { get; set; }
        public static List<CreditCard> GenerateCreditCards(int number)
        {
            List<CreditCard> creditCards = new List<CreditCard>();
            for (int i = 0; i < number; i++)
            {
                CreditCard card = new CreditCard()
                {
                    CardNumber = "10000000" + i,
                    Name = "CreditCard-" + i
                };
                creditCards.Add(card);
            }
            return creditCards;
        }
    }
}
```

![image-20230824141800762](D:\Git_backup\Document\C#\Image\image-20230824141800762.png)

```
如果您還記得在ProcessCard方法中，我們將執行延遲了一秒鐘。但是在那之後，當我們使用Task.WhenAll方法執行多個任務時，所有任務執行都在1秒多一點的時間內完成。這是因為 Task.WhenAll 方法同時執行所有任務，這大大提高了我們應用程式的性能
```

```C#
不使用 await Task.WhenAll(tasks);
公共 static async void ProcessCreditCards(List<CreditCard> creditCards)
{
    var stopwatch = new Stopwatch();
    stopwatch.Start();
    foreach (var creditCard in creditCards)
    {
        var response = await ProcessCard(creditCard);
    }
    stopwatch.Stop();
    Console.WriteLine($"Processing of {creditCards.Count} Credit Cards Done in {stopwatch.ElapsedMilliseconds / 1000.0} Seconds");
}
```

![image-20230824142050488](D:\Git_backup\Document\C#\Image\image-20230824142050488.png)

```
var response = await ProcessCard(creditCard);
個別執行, 每一個1s, 加總後為10多秒
```

---
### 避免主執行緒鎖住

```
100000張
您可以看到主線程大約需要 9 秒。讓我們觀察為什麼？請看下面的圖片。以下 ProcessCreditCards 方法的 foreach 循環運行 100000 次，這實際上需要一些時間，大約 9 秒。因此，在調用 await Task.WhenAll（tasks） 語句之前，我們的主線程被凍結。一旦我們調用 await Task.WhenAll（tasks） 方法，線程就處於活動狀態並開始處理。
```
![image-20230824142932464](D:\Git_backup\Document\C#\Image\image-20230824142932464.png)

```
無論如何，我們需要使主線程可用。為此，我們可以通過使用 C# 中的 Task.Run 異步方法將 foreach 迴圈卸載到另一個線程。讓我們看看怎麼做？請看下面的圖片。我們需要使用 Task.Run 方法，使用委託，我們需要使用 foreach 迴圈。此外，由於Task.Run方法是一種異步方法，因此我們需要使用 await 運算符，如下圖所示。
```

![image-20230824143133867](D:\Git_backup\Document\C#\Image\image-20230824143133867.png)

```C#
        public static async void ProcessCreditCards(List<CreditCard> creditCards)
        {
            var stopwatch = new Stopwatch();
            stopwatch.Start();
            var tasks = new List<Task<string>>();
            await Task.Run(() =>
            {
                foreach (var creditCard in creditCards)
                {
                    var response = ProcessCard(creditCard);
                    tasks.Add(response);
                }
            });
            
            //It will execute all the tasks concurrently
            await Task.WhenAll(tasks);
            stopwatch.Stop();
            Console.WriteLine($"Processing of {creditCards.Count} Credit Cards Done in {stopwatch.ElapsedMilliseconds/1000.0} Seconds");
        }
```

![image-20230824143336041](D:\Git_backup\Document\C#\Image\image-20230824143336041.png)

```
時間差不多, 但避免主執行緒 "鎖住".
```

---

###  用 SemaphoreSlim 限制thread數量, 分批處理

```C#
        //Allowing Maximum 3 tasks to be executed at a time
->      static SemaphoreSlim semaphoreSlim = new SemaphoreSlim(3);
        static void Main(string[] args)
        {
            var stopwatch = new Stopwatch();
            Console.WriteLine($"Main Thread Started");
            //Generating 15 Credit Cards
            List<CreditCard> creditCards = CreditCard.GenerateCreditCards(15);
            Console.WriteLine($"Credit Card Generated : {creditCards.Count}");
            ProcessCreditCards(creditCards);
            Console.WriteLine($"Main Thread Completed");
            Console.ReadKey();
        }        
		public static async void ProcessCreditCards(List<CreditCard> creditCards)
        {
            var stopwatch = new Stopwatch();
            stopwatch.Start();
            var tasks = new List<Task<string>>();
            //Need to use async lambda expression
            tasks = creditCards.Select(async card =>
            {
//This will tell if we have more than 4000 tasks are running, 
//we are going to wait and '
//we're going to wait until the semaphore gets released.
                await semaphoreSlim.WaitAsync();
                //Need to use await operator here as we are using asynchronous WaitAsync
                try
                {
                    return await ProcessCard(card);
                }
                finally
                {
                    //Release the semaphore
                    semaphoreSlim.Release();
                }
                
            }).ToList();
            
            //It will execute a maximum of 3 tasks at a time
            await Task.WhenAll(tasks);
            stopwatch.Stop();
            Console.WriteLine($"Processing of {creditCards.Count} Credit Cards Done in {stopwatch.ElapsedMilliseconds/1000.0} Seconds");
        }
```

![image-20230824150135626](D:\Git_backup\Document\C#\Image\image-20230824150135626.png)
### 真實案例

```C#
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;
using Newtonsoft.Json;
namespace AsynchronousProgramming
{
    class Program
    {
        //Allowing Maximum 3 tasks to be executed at a time
->      static SemaphoreSlim semaphoreSlim = new SemaphoreSlim(3);
        static void Main(string[] args)
        {
            var stopwatch = new Stopwatch();
            Console.WriteLine($"Main Thread Started");
            //Generating 15 Credit Cards
->          List<CreditCard> creditCards = CreditCard.GenerateCreditCards(15);
            Console.WriteLine($"Credit Card Generated : {creditCards.Count}");
            ProcessCreditCards(creditCards);
            Console.WriteLine($"Main Thread Completed");
            Console.ReadKey();
        }
        public static async void ProcessCreditCards(List<CreditCard> creditCards)
        {
            var stopwatch = new Stopwatch();
            stopwatch.Start();
            var tasks = new List<Task<string>>();
            //Need to use async lambda expression
            tasks = creditCards.Select(async card =>
            {
->              await semaphoreSlim.WaitAsync();
                try
                {
                    return await ProcessCard(card);
                }
                finally
                {
->                  semaphoreSlim.Release();
                }
            }).ToList();
            //Return the response a string array
->          var Responses = await Task.WhenAll(tasks);
            //Creating a collection to hold the responses
            List<CreditCardResponse> creditCardResponses = new List<CreditCardResponse>();
            //Looping through the string array
            foreach (var response in Responses)
            {
                //Here, the string is a JSON string
                //Converting the JSON String to .NET Object (CreditCardResponse) using
                //JsonConvert class DeserializeObject
                CreditCardResponse creditCardResponse = JsonConvert.DeserializeObject<CreditCardResponse>(response);
                //Adding the .NET Object into the resposne collection
                creditCardResponses.Add(creditCardResponse);
            }
            //Printing all the approved credit cards using a foreach loop
            Console.WriteLine("\nApproved Credit Cards");
            foreach(var item in creditCardResponses.Where(card => card.IsProcessed == true))
            {
                Console.WriteLine($"Card Number: {item.CardNumber}, Name: {item.Name}");
            }
            //Printing all the rejected credit cards using a foreach loop
            Console.WriteLine("\nRejected Credit Cards");
            foreach (var item in creditCardResponses.Where(card => card.IsProcessed == false))
            {
                Console.WriteLine($"Card Number: {item.CardNumber}, Name: {item.Name}");
            }
        }
        public static async Task<string> ProcessCard(CreditCard creditCard)
        {
            await Task.Delay(1000);
            
            var creditCardResponse = new CreditCardResponse
            {
                CardNumber = creditCard.CardNumber,
                Name = creditCard.Name,
                //Logic to Decide whether the card is processed or rejected
                //If modulus 2 is 0, the processed else rejected
                IsProcessed = creditCard.CardNumber % 2 == 0 ? true : false
            };
            //Converting the .NET Object to JSON string
            string jsonString = JsonConvert.SerializeObject(creditCardResponse);
            //Return the JSON String
            return jsonString;
        }
    }
    public class CreditCard
    {
        public long CardNumber { get; set; }
        public string Name { get; set; }
        public static List<CreditCard> GenerateCreditCards(int number)
        {
            List<CreditCard> creditCards = new List<CreditCard>();
            for (int i = 0; i < number; i++)
            {
                CreditCard card = new CreditCard()
                {
                    CardNumber = 10000000 + i,
                    Name = "CreditCard-" + i
                };
                creditCards.Add(card);
            }
            return creditCards;
        }
    }
    //This class will hold the response after processing the Credit card
    public class CreditCardResponse
    {
        public long CardNumber { get; set; }
        public string Name { get; set; }
        public bool IsProcessed { get; set; }
    }
}
```

### How to Cancel a Task in C# using Cancellation Token

```
CancelTokenSource 向 CancelToken 發出信號，表示它應該被取消。
```

![image-20230824153635409](D:\Git_backup\Document\C#\Image\image-20230824153635409.png)

![image-20230824153839543](D:\Git_backup\Document\C#\Image\image-20230824153839543.png)

```C#
using System;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;
namespace AsynchronousProgramming
{
    class Program
    {
        static void Main(string[] args)
        {
            SomeMethod();
            Console.ReadKey();
        }
        private static async void SomeMethod()
        {
            int count = 10;
            Console.WriteLine("SomeMethod Method Started");
->          CancellationTokenSource cancellationTokenSource = new CancellationTokenSource();
->限定5s後取消
            cancellationTokenSource.CancelAfter(5000);
            try
            {
->              await LongRunningTask(count, cancellationTokenSource.Token);
            }
->          catch (TaskCanceledException ex)
            {
                Console.WriteLine($"{ex.Message}");
            }
            Console.WriteLine("\nSomeMethod Method Completed");
        }
        public static async Task LongRunningTask(int count, CancellationToken token)
        {
            var stopwatch = new Stopwatch();
            stopwatch.Start();
            Console.WriteLine("\nLongRunningTask Started");
->會跑10次共10s
    		for (int i = 1; i <= count; i++)
            {
                await Task.Delay(1000);
                Console.WriteLine("LongRunningTask Processing....");
->              if (token.IsCancellationRequested)
                {
                    throw new TaskCanceledException();
                }
            }
            stopwatch.Stop();
            Console.WriteLine($"LongRunningTask Took {stopwatch.ElapsedMilliseconds / 1000.0} Seconds for Processing");
        }
    }
}
```

![image-20230824154233914](D:\Git_backup\Document\C#\Image\image-20230824154233914.png)

另一種時間設置方式

![image-20230824154403369](D:\Git_backup\Document\C#\Image\image-20230824154403369.png)

案例 : 

Server

```C#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
namespace WebAPIDemo.Controllers
{
    public class HomeController : ApiController
    {
        //api/greetings/name
        [Route("api/greetings/{name}")]
        [HttpGet]
        public async Task<string> GetGreetings(string name)
        {
->故意延遲5s
    		await Task.Delay(5000);
            return $"Hello {name}, Welcome to Web API";
        }
    }
}
```

Client

```C#
using System;
using System.Diagnostics;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
namespace AsynchronousProgramming
{
    class Program
    {
        static void Main(string[] args)
        {
            string Name = "James";
            SomeMethod(Name);
            Console.ReadKey();
        }
        private static async void SomeMethod(string Name)
        {
            Console.WriteLine("Some Method Started");
            using (var client = new HttpClient())
            {
->只待等4s
    		CancellationTokenSource cancellationTokenSource = new CancellationTokenSource(4000);
                client.BaseAddress = new Uri("http://localhost:58937/");
                try
                {
                    Console.WriteLine("Some Method Calling Web API");
                    HttpResponseMessage response = await client.GetAsync($"api/greetings/{Name}", cancellationTokenSource.Token);
                    string message = await response.Content.ReadAsStringAsync();
                    Console.WriteLine(message);
                }
                catch (TaskCanceledException ex)
                {
-> 引發例外
    			Console.WriteLine($"Task Execution Cancelled: {ex.Message}");
                }
                Console.WriteLine("Some Method Completed");
            }
        }
    }
}
```

![image-20230824154846789](D:\Git_backup\Document\C#\Image\image-20230824154846789.png)

---

### How to Create Synchronous Method using Task in C#

![image-20230824155549821](D:\Git_backup\Document\C#\Image\image-20230824155549821.png)

![image-20230824155608548](D:\Git_backup\Document\C#\Image\image-20230824155608548.png)

![image-20230824155625969](D:\Git_backup\Document\C#\Image\image-20230824155625969.png)

![image-20230824155646995](D:\Git_backup\Document\C#\Image\image-20230824155646995.png)

```C#
using System;
using System.Threading;
using System.Threading.Tasks;
namespace AsynchronousProgramming
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Main Method Started");
            SomeMethod1();
            SomeMethod2();
            SomeMethod3();
            SomeMethod4();
            
            Console.WriteLine("Main Method Completed");
            Console.ReadKey();
        }
        //Method returning Task but it is synchronous
        public static Task SomeMethod1()
        {
            //Do Some Task
            Console.WriteLine("SomeMethod1 Executing, It does not return anything");
            //When your method returning Task in synchronous, return Task.CompletedTask
->          return Task.CompletedTask;
        }
        //Synchronous Method returning Task<T>
        public static Task<string> SomeMethod2()
        {
            string someValue = "";
            someValue = "SomeMethod2 Returing a String";
            Console.WriteLine("SomeMethod2 Executing, It return a string");
            //When your synchronous method returning Task<T>, use Task.FromResult
->          return Task.FromResult(someValue);
        }
        //Synchronous Method returning Task with Exception
        public static Task SomeMethod3()
        {
            Console.WriteLine("SomeMethod3 Executing, It will throw an Exception");
            //When your synchronous method returning Task with Exception use, Task.FromException
->          return Task.FromException(new InvalidOperationException());
        }
        //Synchronous Method Cancelling a Task
        public static Task SomeMethod4()
        {
            CancellationTokenSource cts = new CancellationTokenSource();
            cts.Cancel();
            Console.WriteLine("SomeMethod4 Executing, It will Cancel the Task Exception");
            //When your synchronous method cancelling a Task, Task.FromCanceled
->          return Task.FromCanceled(cts.Token);
        }
    }
}
```

---

### RETRY

![image-20230824160125146](D:\Git_backup\Document\C#\Image\image-20230824160125146.png)

```C#
using System;
using System.Threading.Tasks;
namespace AsynchronousProgramming
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Main Method Started");
            RetryMethod();
            
            Console.WriteLine("Main Method Completed");
            Console.ReadKey();
        }
        public static async void RetryMethod()
        {
            //It tells the number of times we will retry the operation if it is failing
            //Of course, if it is not falling then we will not retry
            var RetryTimes = 3;
            //The idea is that we don't want to immediately retry, but 
            //we may want to retry after a certain amount of time.
            //In our case, it is five hundred milliseconds or half a second.
            var WaitTime = 500;
            for (int i = 0; i < RetryTimes; i++)
            {
                try
                {
                    //Do the Operation
                    //If the Operation Successful break the loop
                    await RetryOperation();
                    Console.WriteLine("Operation Successful");
                    break;
                }
                catch (Exception Ex)
                {
                    //If the operations throws an error
                    //Log the Exception if you want
                    Console.WriteLine($"Retry {i+1}: Getting Exception : {Ex.Message}");
                    //Wait for 500 milliseconds
                    await Task.Delay(WaitTime);
                }
            }
        }
        
        public static async Task RetryOperation()
        {
            //Doing Some Processing
            await Task.Delay(500);
            //Throwing Exception so that retry will work
            throw new Exception("Exception Occurred in while Processing...");
        }
    }
}
```

![image-20230824160324090](D:\Git_backup\Document\C#\Image\image-20230824160324090.png)

#### 無參數傳入function : **Func<Task> fun**

![image-20230824160446935](D:\Git_backup\Document\C#\Image\image-20230824160446935.png)

```C#
using System;
using System.Threading.Tasks;
namespace AsynchronousProgramming
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Main Method Started");
            RetryMethod();
            
            Console.WriteLine("Main Method Completed");
            Console.ReadKey();
        }
        public static async void RetryMethod()
        {
            //It will retry 3 times, here the function is RetryOperation1
            await Retry(RetryOperation1);
            //It will retry 4 times, here the function is RetryOperation2
            await Retry(RetryOperation2,4);
        }
        //Generic Retry Method
        //Func is a generate delegate which returns something, in our case it is returning a Task
        //We are setting the default value for RetryTimes = 3 and WaitTime = 500 milliseconds
        public static async Task Retry(Func<Task> fun, int RetryTimes = 3, int WaitTime = 500)
        {
            for (int i = 0; i < RetryTimes; i++)
            {
                try
                {
                    //Do the Operation
                    //We are going to invoke whatever function the generic func delegate points to
                    await fun();
                    Console.WriteLine("Operation Successful");
                    break;
                }
                catch (Exception Ex)
                {
                    //If the operations throws an error
                    //Log the Exception if you want
                    Console.WriteLine($"Retry {i + 1}: Getting Exception : {Ex.Message}");
                    //Wait for 500 milliseconds
                    await Task.Delay(WaitTime);
                }
            }
        }
        public static async Task RetryOperation1()
        {
            //Doing Some Processing
            await Task.Delay(500);
            //Throwing Exception so that retry will work
            throw new Exception("Exception Occurred in RetryOperation1");
        }
        public static async Task RetryOperation2()
        {
            //Doing Some Processing
            await Task.Delay(500);
            //Throwing Exception so that retry will work
            throw new Exception("Exception Occurred in RetryOperation2");
        }
    }
}
```

![image-20230824162304761](D:\Git_backup\Document\C#\Image\image-20230824162304761.png)

---

減少一次, 並在最後在執行一次 await fun();

![image-20230824162514116](D:\Git_backup\Document\C#\Image\image-20230824162514116.png)

最後一次故意拋出異常, 讓外部攔截處理

![image-20230824162705967](D:\Git_backup\Document\C#\Image\image-20230824162705967.png)

```C#
完整代碼
using System;
using System.Threading.Tasks;
namespace AsynchronousProgramming
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Main Method Started");
            RetryMethod();
            
            Console.WriteLine("Main Method Completed");
            Console.ReadKey();
        }
        public static async void RetryMethod()
        {
            //It will retry 3 times, here the function is RetryOperation1
            try
            {
->              await Retry(RetryOperation1);
            }
->          catch(Exception ex)
            {
                Console.WriteLine("The Operation was Failed");
            }
        }
        //Generic Retry Method
        //Func is a generate delegate which returns something, in our case it is returning a Task
        //We are setting the default value for RetryTimes = 3 and WaitTime = 500 milliseconds
        public static async Task Retry(Func<Task> fun, int RetryTimes = 3, int WaitTime = 500)
        {
            //Reducing the for loop Exection for 1 time
            for (int i = 0; i < RetryTimes - 1; i++)
            {
                try
                {
                    //Do the Operation
                    //We are going to invoke whatever function the generic func delegate points to
                    await fun();
                    Console.WriteLine("Operation Successful");
                    break;
                }
                catch (Exception Ex)
                {
                    //If the operations throws an error
                    //Log the Exception if you want
                    Console.WriteLine($"Retry {i + 1}: Getting Exception : {Ex.Message}");
                    //Wait for 500 milliseconds
                    await Task.Delay(WaitTime);
                }
            }
            //Final try to execute the operation
->          await fun();
        }
        public static async Task RetryOperation1()
        {
            //Doing Some Processing
            await Task.Delay(500);
            //Throwing Exception so that retry will work
            throw new Exception("Exception Occurred in RetryOperation1");
        }
    }
}
```

#### 具有返回值. **Task<T>**, 有參數傳入 **Func<Task<T>> fun**

![image-20230824163023804](D:\Git_backup\Document\C#\Image\image-20230824163023804.png)

```C#
using System;
using System.Threading.Tasks;
namespace AsynchronousProgramming
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Main Method Started");
            RetryMethod();
            
            Console.WriteLine("Main Method Completed");
            Console.ReadKey();
        }
        public static async void RetryMethod()
        {
            //It will retry 3 times, here the function is RetryOperation1
            try
            {
                var result = await Retry(RetryOperationValueReturning);
                Console.WriteLine(result);
            }
            catch(Exception ex)
            {
                Console.WriteLine("The Operation was Failed");
            }
        }
        
        //Generic Retry Method Returning Value
        //Func is a generate delegate which returns something, in our case it is returning a Task
        //We are setting the default value for RetryTimes = 3 and WaitTime = 500 milliseconds
->
        public static async Task<T> Retry<T>(Func<Task<T>> fun, int RetryTimes = 3, int WaitTime = 500)
        {
            //Reducing the for loop Exection for 1 time
            for (int i = 0; i < RetryTimes - 1; i++)
            {
                try
                {
                    //Do the Operation
                    //We are going to invoke whatever function the generic func delegate points to
                    //We will return from here if the operation was successful
                   return await fun();
                   
                }
                catch (Exception Ex)
                {
                    //If the operations throws an error
                    //Log the Exception if you want
                    Console.WriteLine($"Retry {i + 1}: Getting Exception : {Ex.Message}");
                    //Wait for 500 milliseconds
                    await Task.Delay(WaitTime);
                }
            }
            //Final try to execute the operation
           return await fun();
        }
        public static async Task<string> RetryOperationValueReturning()
        {
            //Doing Some Processing and return the value
            await Task.Delay(500);
            //Uncomment the below code to successfully return a string
            //return "Operation Successful";
            //Throwing Exception so that retry will work
            throw new Exception("Exception Occurred in RetryOperation1");
        }
        =>
        public static async Task<string> RetryOperationValueReturning()
        {
            await Task.Delay(500);
            return "Operation Successful";
        }            
    }
}
```

### Only One Pattern in C#

只取一次結果, 其他取消

![image-20230824173345148](D:\Git_backup\Document\C#\Image\image-20230824173345148.png)

```C#
await Task.WhenAny(tasks);
...   
CTS.Cancel();
```

![image-20230824173853048](D:\Git_backup\Document\C#\Image\image-20230824173853048.png)

```C#
完整代碼
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;
namespace AsynchronousProgramming
{
    class Program
    {
        static void Main(string[] args)
        {
            OnlyOnePattern();
            Console.ReadKey();
        }
        public static async void OnlyOnePattern()
        {
            //Creating the Cancellation Token
            var CTS = new CancellationTokenSource();
            //Creating the list of names to process by the ProcessingName method
            List<string> names = new List<string>() { "Pranaya", "Anurag", "James", "Smith" };
            Console.WriteLine($"All Names");
            foreach (var item in names)
            {
                Console.Write($"{item} ");
            }
            //Creating the tasks by passing the name and cancellation token using Linq
            //It will invoke the ProcessingName method by passing name and cancellation token
            var tasks = names.Select(x => ProcessingName(x, CTS.Token));
->            
            var task = await Task.WhenAny(tasks);
            //Fetch the first completed result
            var content = await task;
            //Cancel the token
->			CTS.Cancel();
            //Print the content
            Console.WriteLine($"\n{content}");
        }
        public static async Task<string> ProcessingName(string name, CancellationToken token)
        {
            //Creating Dynamic Waiting Time
            //The following statement will generate a number between 1 and 10 dynamically
            var WaitingTime = new Random().NextDouble() * 10 + 1;
            await Task.Delay(TimeSpan.FromSeconds(WaitingTime));
            string message = $"Hello {name}";
            return message;
        }
    }
}
```

#### 封裝成函式

![image-20230824174240834](D:\Git_backup\Document\C#\Image\image-20230824174240834.png)

![image-20230824174431720](D:\Git_backup\Document\C#\Image\image-20230824174431720.png)

```C#
完整範例
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;
namespace AsynchronousProgramming
{
    class Program
    {
        static void Main(string[] args)
        {
            SomeMethod();
            Console.ReadKey();
        }
        public static async void SomeMethod()
        {
            //Creating the collection of names
            List<string> names = new List<string>() { "Pranaya", "Anurag", "James", "Smith" };
            Console.WriteLine($"All Names");
            foreach (var item in names)
            {
                Console.Write($"{item} ");
            }
            //Creating the IEnumerable of Generic Func which points to ProcessName method
            //by passing the name and cancellation token
            var tasks = names.Select(name =>
            {
                Func<CancellationToken, Task<string>> func = (ct) => ProcessName(name, ct);
                return func;
            });
            //Calling the GenericOnlyOnePattern method by passing the collection of Func delegate
            var content = await GenericOnlyOnePattern(tasks);
            //Printing the content
            Console.WriteLine($"\n{content}");
        }
        //The Generic OnlyOne Pattern 
        //Here the parameter IEnumerable<Func<CancellationToken, Task<T>>> functions specify
        //a collection of method that takes Cancellation Token as a parameter and returns a Task<T>
        public static async Task<T> GenericOnlyOnePattern<T>(IEnumerable<Func<CancellationToken, Task<T>>> functions)
        {
            //Creating local CancellationTokenSource
            var cancellationTokenSource = new CancellationTokenSource();
            
            //Invoking the function by passing the Cancellation Token
            //It will invoke the functions which is pointed by the Func Generic Delegate
            var tasks = functions.Select(function => function(cancellationTokenSource.Token));
            //Calling the WhenAny method by passing the list of tasks
            //It create a task that represents the completion of one of the supplied tasks. 
            //The return task's Result is the task that completed. 
            var task = await Task.WhenAny(tasks);
            //Cancel the token
            cancellationTokenSource.Cancel();
            //Return the content
            return await task;
        }
        public static async Task<string> ProcessName(string name, CancellationToken token)
        {
            //Creating Dynamic Waiting Time
            //The following statement will generate a number between 1 and 10 dynamically
            var WaitingTime = new Random().NextDouble() * 10 + 1;
            await Task.Delay(TimeSpan.FromSeconds(WaitingTime));
            string message = $"Hello {name}";
            return message;
        }
    }
}
```

---

![image-20230824175226249](D:\Git_backup\Document\C#\Image\image-20230824175226249.png)

![image-20230824175249523](D:\Git_backup\Document\C#\Image\image-20230824175249523.png)

![image-20230824175307861](D:\Git_backup\Document\C#\Image\image-20230824175307861.png)

```C#
完整代碼
using System;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;
namespace AsynchronousProgramming
{
    class Program
    {
        static void Main(string[] args)
        {
            SomeMethod();
            Console.ReadKey();
        }
        public static async void SomeMethod()
        {
            //Calling two Different Method using Generic Only One Pattern
            var content = await GenericOnlyOnePattern(
                  //Calling the HelloMethod
                  (ct) => HelloMethod("Pranaya", ct),
                  //Calling the GoodbyeMethod
                  (ct) => GoodbyeMethod("Anurag", ct)
                  );
            //Printing the result on the Console
            Console.WriteLine($"{content}");
        }
        public static async Task<T> GenericOnlyOnePattern<T>(params Func<CancellationToken, Task<T>>[] functions)
        {
            var cancellationTokenSource = new CancellationTokenSource();
            var tasks = functions.Select(function => function(cancellationTokenSource.Token));
            var task = await Task.WhenAny(tasks);
            cancellationTokenSource.Cancel();
            return await task;
        }
        
        public static async Task<string> HelloMethod(string name, CancellationToken token)
        {
            var WaitingTime = new Random().NextDouble() * 10 + 1;
            await Task.Delay(TimeSpan.FromSeconds(WaitingTime));
            string message = $"Hello {name}";
            return message;
        }
        public static async Task<string> GoodbyeMethod(string name, CancellationToken token)
        {
            var WaitingTime = new Random().NextDouble() * 10 + 1;
            await Task.Delay(TimeSpan.FromSeconds(WaitingTime));
            string message = $"Goodbye {name}";
            return message;
        }
    }
}
```

```
現在，多次運行上述操作，您會發現有時HelloMethod首先執行，有時GoodbyeMethod首先執行。完成一種方法后，另一種方法將被取消。
```

### How to Control the Result of a Task in C#

 **TaskCompletionSource** 

![image-20230824175743780](D:\Git_backup\Document\C#\Image\image-20230824175743780.png)

![image-20230824180002792](D:\Git_backup\Document\C#\Image\image-20230824180002792.png)

```C#
using System;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;
namespace AsynchronousProgramming
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Enter a number between 1 and 3");
            string value = Console.ReadLine();
            SomeMethod(value);
            Console.ReadKey();
        }
        public static async void SomeMethod(string value)
        {
            var task = EvaluateValue(value);
            Console.WriteLine("EvaluateValue Started");
            try
            {
                Console.WriteLine($"Is Completed: {task.IsCompleted}");
                Console.WriteLine($"Is IsCanceled: {task.IsCanceled}");
                Console.WriteLine($"Is IsFaulted: {task.IsFaulted}");
                await task;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            Console.WriteLine("EvaluateValue Completed");
        }
        public static Task EvaluateValue(string value)
        {
            //Creates an object of TaskCompletionSource with the specified options.
            //RunContinuationsAsynchronously option Forces the task to be executed asynchronously.
            var TCS = new TaskCompletionSource<object>(TaskCreationOptions.RunContinuationsAsynchronously);
            if (value == "1")
            {
                //Set the underlying Task into the RanToCompletion state.
                TCS.SetResult(null);
            }
            else if(value == "2")
            {
                //Set the underlying Task into the Canceled state.
                TCS.SetCanceled();
            }
            else
            {
                //Set the underlying Task into the Faulted state and binds it to a specified exception.
                TCS.SetException(new ApplicationException($"Invalid Value : {value}"));
            }
            //Return the task associted with the TaskCompletionSource
            return TCS.Task;
        }
    }
}
```

![image-20230824180115877](D:\Git_backup\Document\C#\Image\image-20230824180115877.png)

![image-20230824180159194](D:\Git_backup\Document\C#\Image\image-20230824180159194.png)

![image-20230824180214585](D:\Git_backup\Document\C#\Image\image-20230824180214585.png)

```C#
using System;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;
namespace AsynchronousProgramming
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Enter a number between 1 and 3");
            string value = Console.ReadLine();
            SomeMethod(value);
            Console.ReadKey();
        }
        public static async void SomeMethod(string value)
        {
            var task = EvaluateValue(value);
            Console.WriteLine("EvaluateValue Started");
            try
            {
                Console.WriteLine($"Is Completed: {task.IsCompleted}");
                Console.WriteLine($"Is IsCanceled: {task.IsCanceled}");
                Console.WriteLine($"Is IsFaulted: {task.IsFaulted}");
                var result = await task;
                Console.WriteLine($"Result: {result}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
            }
            Console.WriteLine("EvaluateValue Completed");
        }
        public static Task<string> EvaluateValue(string value)
        {
            //Creates an object of TaskCompletionSource with the specified options.
            //RunContinuationsAsynchronously option Forces the task to be executed asynchronously.
            var TCS = new TaskCompletionSource<string>(TaskCreationOptions.RunContinuationsAsynchronously);
            if (value == "1")
            {
                //Set the underlying Task into the RanToCompletion state.
->              TCS.SetResult("Task Completed");
            }
            else if(value == "2")
            {
                //Set the underlying Task into the Canceled state.
                TCS.SetCanceled();
            }
            else
            {
                //Set the underlying Task into the Faulted state and binds it to a specified exception.
                TCS.SetException(new ApplicationException($"Invalid Value : {value}"));
            }
            //Return the task associted with the TaskCompletionSource
            return TCS.Task;
        }
    }
}
```

![image-20230824180541088](D:\Git_backup\Document\C#\Image\image-20230824180541088.png)

---

### Task-Based Asynchronous Programming in C#

```C#
using System;
using System.Threading;
using System.Threading.Tasks;
namespace TaskBasedAsynchronousProgramming
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine($"Main Thread : {Thread.CurrentThread.ManagedThreadId} Statred");
            Action actionDelegate = new Action(PrintCounter);
            Task task1 = new Task(actionDelegate);
            //You can directly pass the PrintCounter method as its signature is same as Action delegate
            //Task task1 = new Task(PrintCounter);
            task1.Start();
            Console.WriteLine($"Main Thread : {Thread.CurrentThread.ManagedThreadId} Completed");
            Console.ReadKey();
        }
        static void PrintCounter()
        {
            Console.WriteLine($"Child Thread : {Thread.CurrentThread.ManagedThreadId} Started");
            for (int count = 1; count <= 5; count++)
            {
                Console.WriteLine($"count value: {count}");
            }
            Console.WriteLine($"Child Thread : {Thread.CurrentThread.ManagedThreadId} Completed");
        }
    }
}
```

**Task task1 =  Task.Factory.StartNew(PrintCounter);**

```C#
using System;
using System.Threading;
using System.Threading.Tasks;
namespace TaskBasedAsynchronousProgramming
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine($"Main Thread : {Thread.CurrentThread.ManagedThreadId} Statred");
            Task task1 =  Task.Factory.StartNew(PrintCounter); 
            Console.WriteLine($"Main Thread : {Thread.CurrentThread.ManagedThreadId} Completed");
            Console.ReadKey();
        }
        static void PrintCounter()
        {
            Console.WriteLine($"Child Thread : {Thread.CurrentThread.ManagedThreadId} Started");
            for (int count = 1; count <= 5; count++)
            {
                Console.WriteLine($"count value: {count}");
            }
            Console.WriteLine($"Child Thread : {Thread.CurrentThread.ManagedThreadId} Completed");
        }
    }
}
```

**Task task1 = Task.Run(() => { PrintCounter(); });**

```C#
using System;
using System.Threading;
using System.Threading.Tasks;
namespace TaskBasedAsynchronousProgramming
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine($"Main Thread : {Thread.CurrentThread.ManagedThreadId} Statred");
            Task task1 = Task.Run(() => { PrintCounter(); });
            Console.WriteLine($"Main Thread : {Thread.CurrentThread.ManagedThreadId} Completed");
            Console.ReadKey();
        }
        static void PrintCounter()
        {
            Console.WriteLine($"Child Thread : {Thread.CurrentThread.ManagedThreadId} Started");
            for (int count = 1; count <= 5; count++)
            {
                Console.WriteLine($"count value: {count}");
            }
            Console.WriteLine($"Child Thread : {Thread.CurrentThread.ManagedThreadId} Completed");
        }
    }
}
```

**task1.Wait();**  以使程式執行等到 task1 完成其執行。 

```C#
using System;
using System.Threading;
using System.Threading.Tasks;
namespace TaskBasedAsynchronousProgramming
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine($"Main Thread : {Thread.CurrentThread.ManagedThreadId} Statred");
            Task task1 = Task.Run(() => 
            {
                PrintCounter();
            });
            task1.Wait();
            Console.WriteLine($"Main Thread : {Thread.CurrentThread.ManagedThreadId} Completed");
            Console.ReadKey();
        }
        static void PrintCounter()
        {
            Console.WriteLine($"Child Thread : {Thread.CurrentThread.ManagedThreadId} Started");
            for (int count = 1; count <= 5; count++)
            {
                Console.WriteLine($"count value: {count}");
            }
            Console.WriteLine($"Child Thread : {Thread.CurrentThread.ManagedThreadId} Completed");
        }
    }
}
```

![image-20230824181334162](D:\Git_backup\Document\C#\Image\image-20230824181334162.png)

---



```C#
using System;
using System.Threading;
using System.Threading.Tasks;
namespace TaskBasedAsynchronousProgramming
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine($"Main Thread : {Thread.CurrentThread.ManagedThreadId} Statred");
            #region Stat Method
->//Creating Task using Method
            Task task1 = new Task(PrintCounter);
            task1.Start();
->//Creating Task using Anonymous Method
            Task task2 = new Task(delegate ()
            {
                Console.WriteLine($"Child Thread : {Thread.CurrentThread.ManagedThreadId} Started");
                Task.Delay(200);
                Console.WriteLine($"Child Thread : {Thread.CurrentThread.ManagedThreadId} Completed");
            });
            task2.Start();
->//Creating Task using Lambda Expression
            Task task3 = new Task(() =>
            {
                Console.WriteLine($"Child Thread : {Thread.CurrentThread.ManagedThreadId} Started");
                Task.Delay(200);
                Console.WriteLine($"Child Thread : {Thread.CurrentThread.ManagedThreadId} Completed");
            });
            task3.Start();
            #endregion
            #region StartNew
->//Creating Task using Method
            Task task4 = Task.Factory.StartNew(PrintCounter);
->//Creating Task using Anonymous Method
            Task task5 = Task.Factory.StartNew(delegate ()
            {
                Console.WriteLine($"Child Thread : {Thread.CurrentThread.ManagedThreadId} Started");
                Task.Delay(200);
                Console.WriteLine($"Child Thread : {Thread.CurrentThread.ManagedThreadId} Completed");
            });
->//Creating Task using Lambda Expression
            Task task6 = Task.Factory.StartNew(() =>
            {
                Console.WriteLine($"Child Thread : {Thread.CurrentThread.ManagedThreadId} Started");
                Task.Delay(200);
                Console.WriteLine($"Child Thread : {Thread.CurrentThread.ManagedThreadId} Completed");
            });
            #endregion
            #region Run
->//Creating Task using Method
            Task task7 = Task.Run(() => { PrintCounter(); });
->//Creating Task using Anonymous Method
            Task task8 = Task.Run(delegate ()
            {
                Console.WriteLine($"Child Thread : {Thread.CurrentThread.ManagedThreadId} Started");
                Task.Delay(200);
                Console.WriteLine($"Child Thread : {Thread.CurrentThread.ManagedThreadId} Completed");
            });
->//Creating Task using Lambda Expression
            Task task9 = Task.Run(() =>
            {
                Console.WriteLine($"Child Thread : {Thread.CurrentThread.ManagedThreadId} Started");
                Task.Delay(200);
                Console.WriteLine($"Child Thread : {Thread.CurrentThread.ManagedThreadId} Completed");
            });
            #endregion
            
            Console.WriteLine($"Main Thread : {Thread.CurrentThread.ManagedThreadId} Completed");
            Console.ReadKey();
        }
        static void PrintCounter()
        {
            Console.WriteLine($"Child Thread : {Thread.CurrentThread.ManagedThreadId} Started");
            Thread.Sleep(200);
            Console.WriteLine($"Child Thread : {Thread.CurrentThread.ManagedThreadId} Completed");
        }
    }
}
```

### Chaining Tasks by Using Continuation Tasks

**ContinueWith **. A 做完接著做 B.

```C#
using System;
using System.Threading.Tasks;
namespace TaskBasedAsynchronousProgramming
{
    class Program
    {
        static void Main(string[] args)
        {
            Task<string> task1 = Task.Run(() =>
            {
                return 12;
            }).ContinueWith((antecedent) =>
            {
                return $"The Square of {antecedent.Result} is: {antecedent.Result * antecedent.Result}";
            });
            Console.WriteLine(task1.Result);
            
            Console.ReadKey();
        }
    }
}
```



```C#
using System;
using System.Threading.Tasks;
namespace TaskBasedAsynchronousProgramming
{
    class Program
    {
        static void Main(string[] args)
        {
            Task<int> task = Task.Run(() =>
            {
                return 10;
            });
            task.ContinueWith((i) =>
            {
                Console.WriteLine("TasK Canceled");
            }, TaskContinuationOptions.OnlyOnCanceled);
            task.ContinueWith((i) =>
            {
                Console.WriteLine("Task Faulted");
            }, TaskContinuationOptions.OnlyOnFaulted);
            var completedTask = task.ContinueWith((i) =>
            {
                Console.WriteLine("Task Completed");
            }, TaskContinuationOptions.OnlyOnRanToCompletion);
            completedTask.Wait();
            Console.ReadKey();
        }
    }
}
```

















































---


## Function

### Stopwatch

```C#
        public static async void ProcessCreditCards(List<CreditCard> creditCards)
        {
            var stopwatch = new Stopwatch();
            stopwatch.Start();
...
    		stopwatch.Stop();
            Console.WriteLine($"Processing of {creditCards.Count} Credit Cards Done in {stopwatch.ElapsedMilliseconds/1000.0} Seconds");
        }
```











