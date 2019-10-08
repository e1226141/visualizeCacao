MBB:0027 
0x00007fafa075d338:   90                               nop
0x00007fafa075d339:   b8 00 00 00 00                   mov    $0x0,%eax
0x00007fafa075d33e:   b9 00 00 00 00                   mov    $0x0,%ecx
0x00007fafa075d343:   8b 57 10                         mov    0x10(%rdi),%edx
MBB:0028 
0x00007fafa075d346:   3b ca                            cmp    %edx,%ecx
0x00007fafa075d348:   0f 8d 3d 00 00 00                jge    0x00007fafa075d38b
MBB:0029 
0x00007fafa075d34e:   be 00 00 00 00                   mov    $0x0,%esi
0x00007fafa075d353:   3b ce                            cmp    %esi,%ecx
0x00007fafa075d355:   0f 84 05 00 00 00                je     0x00007fafa075d360
0x00007fafa075d35b:   e9 05 00 00 00                   jmpq   0x00007fafa075d365
MBB:0033 
0x00007fafa075d360:   e9 14 00 00 00                   jmpq   0x00007fafa075d379
MBB:0030 
0x00007fafa075d365:   be 01 00 00 00                   mov    $0x1,%esi
0x00007fafa075d36a:   44 8b c1                         mov    %ecx,%r8d
0x00007fafa075d36d:   44 2b c6                         sub    %esi,%r8d
0x00007fafa075d370:   42 8b 74 87 18                   mov    0x18(%rdi,%r8,4),%esi
0x00007fafa075d375:   89 74 8f 18                      mov    %esi,0x18(%rdi,%rcx,4)
MBB:0031 
0x00007fafa075d379:   8b 74 8f 18                      mov    0x18(%rdi,%rcx,4),%esi
0x00007fafa075d37d:   03 c6                            add    %esi,%eax
0x00007fafa075d37f:   be 01 00 00 00                   mov    $0x1,%esi
0x00007fafa075d384:   03 ce                            add    %esi,%ecx
0x00007fafa075d386:   e9 bb ff ff ff                   jmpq   0x00007fafa075d346
MBB:0032 
0x00007fafa075d38b:   c3                               retq   
