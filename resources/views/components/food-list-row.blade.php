@props(['food'])

<tr class="border-b dark:border-neutral-500">
    <td class="whitespace-nowrap px-6 py-4 font-medium">{{ $food['position'] }}</td>
    <td class="whitespace-nowrap px-6 py-4">{{ $food['name'] }}</td>
    <td class="whitespace-nowrap px-6 py-4">{{ $food['amount_quantity'] }}{{ $food['amount_unit'] }}</td>
    <td class="whitespace-nowrap px-6 py-4">{{ $food['carbs'] }}</td>
    <td class="whitespace-nowrap px-6 py-4">{{ $food['proteins'] }}</td>
    <td class="whitespace-nowrap px-6 py-4">{{ $food['fats'] }}</td>
</tr>