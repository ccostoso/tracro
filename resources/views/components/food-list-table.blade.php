@props(['foods'])

<div class="flex flex-col block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
                <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 text-center">
                    Foods
                </h5>
                <hr class="mb-2" />
                <table class="min-w-full text-left text-sm font-light">
                    <thead class="border-b font-medium dark:border-neutral-500">
                        <tr>
                            <th scope="col" class="px-6 py-4">#</th>
                            <th scope="col" class="px-6 py-4">Name</th>
                            <th scope="col" class="px-6 py-4">Amount</th>
                            <th scope="col" class="px-6 py-4">Carbs</th>
                            <th scope="col" class="px-6 py-4">Proteins</th>
                            <th scope="col" class="px-6 py-4">Fats</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse ($foods as $food)
                            <x-food-list-row :food="$food" />
                        @empty
                            <td class="whitespace-nowrap px-6 py-4 font-medium">0</td>
                            <td class="whitespace-nowrap px-6 py-4"></td>
                            <td class="whitespace-nowrap px-6 py-4"></td>
                            <td class="whitespace-nowrap px-6 py-4"></td>
                            <td class="whitespace-nowrap px-6 py-4"></td>
                        @endforelse
                    </tbody>
                </table>
                <section class="flex justify-center my-2">
                    <x-primary-button>
                        Add New Entry
                    </x-primary-button>
                </section>
            </div>
        </div>
    </div>
</div>
