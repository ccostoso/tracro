@php
    $foods = [
        [
            'position' => 1,
            'name' => 'Yogurt',
            'amount_quantity' => 20,
            'amount_unit' => 'g',
            'carbs' => 8.24,
            'proteins' => 20,
            'fats' => 4.12,
        ],
        [
            'position' => 2,
            'name' => 'Yogurt',
            'amount_quantity' => 20,
            'amount_unit' => 'g',
            'carbs' => 8.24,
            'proteins' => 20,
            'fats' => 4.12,
        ],
    ];
@endphp

<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Logs
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="grid grid-cols-2 gap-4">
                <x-food-list-table :foods="$foods" />
                <x-statistics-table-panel />
            </div>
        </div>
    </div>
</x-app-layout>
